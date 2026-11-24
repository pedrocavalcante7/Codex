#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
python3 tools/check_asset_access.py
SDK_DIR=${SDK_DIR:-/tmp/codice-sdk}
mkdir -p build/classes
JAVAC_BIN=${JAVAC_BIN:-java}
"$JAVAC_BIN" -m jdk.compiler/com.sun.tools.javac.Main --release 8 -classpath "$SDK_DIR/android-35/android.jar" -d build/classes src/br/com/codice/aventureiro/MainActivity.java
"$SDK_DIR/android-15/d8" --lib "$SDK_DIR/android-35/android.jar" --min-api 26 --output build build/classes/br/com/codice/aventureiro/*.class
"$SDK_DIR/android-15/aapt2" compile --dir res -o build/res.zip
"$SDK_DIR/android-15/aapt2" link -o build/unsigned.apk -I "$SDK_DIR/android-35/android.jar" --manifest AndroidManifest.xml -A assets build/res.zip
(cd build && zip -q unsigned.apk classes.dex)
"$SDK_DIR/android-15/zipalign" -f 4 build/unsigned.apk build/aligned.apk
"$SDK_DIR/android-15/apksigner" sign --ks ../Codice-assinatura-original.p12 --ks-pass pass:codice-local-2024 --out build/signed.apk build/aligned.apk
"$SDK_DIR/android-15/apksigner" verify build/signed.apk
python3 tools/check_apk.py build/signed.apk
cp build/signed.apk ../Codice-do-Aventureiro-4.84.apk
