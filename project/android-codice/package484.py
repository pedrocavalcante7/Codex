"""Package updated assets while preserving the original APK compression methods."""
import struct,zipfile,os
from pathlib import Path
S=struct
base=Path(os.environ.get('CODICE_BASE_APK','verified483/Codice-do-Aventureiro-4.83.apk'));src=Path(os.environ.get('CODICE_ASSETS','android-codice/assets'));
def length8(n):return bytes([n]) if n<128 else bytes([0x80|(n>>8),n&255])
def length16(n):return S.pack('<H',n) if n<32768 else S.pack('<HH',0x8000|(n>>16),n&65535)
def manifest(data):
 totalType,header,total=S.unpack_from('<HHI',data);chunks=[];pos=header
 while pos<len(data):
  typ,hs,size=S.unpack_from('<HHI',data,pos);c=bytearray(data[pos:pos+size])
  if typ==1:
   count,nstyles,flags,stringsStart,stylesStart=S.unpack_from('<IIIII',c,8);utf8=bool(flags&256);offsets=S.unpack_from('<'+'I'*count,c,hs);values=[]
   def getlen(p,small):
    if small:
     n=c[p];return (((n&127)<<8)|c[p+1],p+2) if n&128 else (n,p+1)
    n=S.unpack_from('<H',c,p)[0];return (((n&32767)<<16)|S.unpack_from('<H',c,p+2)[0],p+4) if n&32768 else (n,p+2)
   for off in offsets:
    p=stringsStart+off;n,p=getlen(p,utf8)
    if utf8:b,p=getlen(p,True);s=bytes(c[p:p+b]).decode()
    else:s=bytes(c[p:p+n*2]).decode('utf-16le')
    values.append(s)
   replacements={'4.83':'4.84'}
   values=[replacements.get(s,s) for s in values];blob=bytearray();new_offsets=[]
   for s in values:
    new_offsets.append(len(blob));n=len(s.encode('utf-16le'))//2
    if utf8:b=s.encode();blob+=length8(n)+length8(len(b))+b+b'\0'
    else:blob+=length16(n)+s.encode('utf-16le')+b'\0\0'
   while len(blob)%4:blob+=b'\0'
   styleOffsets=bytes(c[hs+count*4:hs+(count+nstyles)*4]);styleData=bytes(c[stylesStart:]) if stylesStart else b'';start=hs+4*(count+nstyles);endStyle=start+len(blob) if nstyles else 0;newSize=start+len(blob)+len(styleData)
   c=bytearray(S.pack('<HHI',typ,hs,newSize)+S.pack('<IIIII',count,nstyles,flags&~1,start,endStyle));c+=S.pack('<'+'I'*count,*new_offsets)+styleOffsets+blob+styleData
  elif typ==0x102:
   attrStart,attrSize,attrCount=S.unpack_from('<HHH',c,24)
   for j in range(attrCount):
    p=16+attrStart+j*attrSize;name=S.unpack_from('<I',c,p+4)[0]
    if values[name]=='versionCode':S.pack_into('<I',c,p+16,115)
  chunks.append(bytes(c));pos+=size
 out=S.pack('<HHI',totalType,header,header+sum(map(len,chunks)))+b''.join(chunks);return out
with zipfile.ZipFile(base) as z,zipfile.ZipFile('update-unsigned.apk','w',zipfile.ZIP_DEFLATED,compresslevel=9) as out:
 for n in z.namelist():
  if n.startswith('META-INF/'):continue
  data=manifest(z.read(n)) if n=='AndroidManifest.xml' else ((src/n.removeprefix('assets/')).read_bytes() if n.startswith('assets/') and (src/n.removeprefix('assets/')).is_file() else z.read(n))
  out.writestr(n,data,compress_type=z.getinfo(n).compress_type)
print('Packaged revision; original classes.dex and resources retained.')
