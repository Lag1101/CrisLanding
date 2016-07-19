#!/bin/bash

dstDir=./prod/

for i in *.jpg; do # Whitespace-safe but not recursive.
    f="$i"
    extension="${f##*.}"
    filename="${f%.*}"

    echo ${f}
    cwebp ${f} -o ${dstDir}${filename}.webp
done