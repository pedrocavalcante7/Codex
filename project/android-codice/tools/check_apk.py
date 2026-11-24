#!/usr/bin/env python3
"""Reject APK packaging defects before delivery (not a device install test)."""
import struct
import sys
import zipfile
from pathlib import Path

def check(path):
    with zipfile.ZipFile(path) as z, Path(path).open('rb') as raw:
        names = z.namelist()
        if len(names) != len(set(names)):
            raise ValueError('Duplicate ZIP entries')
        bad = z.testzip()
        if bad:
            raise ValueError('Corrupt ZIP entry: ' + bad)
        for name in ('AndroidManifest.xml', 'resources.arsc', 'classes.dex', 'assets/index.html'):
            z.getinfo(name)
        table = z.getinfo('resources.arsc')
        if table.compress_type != zipfile.ZIP_STORED:
            raise ValueError('resources.arsc must be uncompressed for targetSdk >= 30')
        for item in z.infolist():
            raw.seek(item.header_offset)
            header = raw.read(30)
            if header[:4] != b'PK\x03\x04':
                raise ValueError('Invalid local ZIP header: ' + item.filename)
            name_len, extra_len = struct.unpack_from('<HH', header, 26)
            offset = item.header_offset + 30 + name_len + extra_len
            if item.compress_type == zipfile.ZIP_STORED and offset % 4:
                raise ValueError('Unaligned stored entry: ' + item.filename)
        manifest = z.read('AndroidManifest.xml')
        typ, header_size, size = struct.unpack_from('<HHI', manifest)
        if typ != 3 or size != len(manifest):
            raise ValueError('Invalid binary AndroidManifest.xml size/type')
        pos = header_size
        while pos < size:
            _, hs, chunk_size = struct.unpack_from('<HHI', manifest, pos)
            if hs < 8 or chunk_size < hs or pos + chunk_size > size or chunk_size % 4:
                raise ValueError('Invalid manifest chunk at ' + str(pos))
            pos += chunk_size
        if pos != size:
            raise ValueError('Truncated manifest')
        if not z.read('classes.dex').startswith(b'dex\n'):
            raise ValueError('Invalid DEX header')
    print('PASS APK CRC, unique entries, uncompressed/aligned resources, manifest chunk sizes, DEX header')

if __name__ == '__main__':
    try:
        check(sys.argv[1])
    except (ValueError, KeyError, OSError, zipfile.BadZipFile) as exc:
        sys.exit('FAIL: ' + str(exc))
