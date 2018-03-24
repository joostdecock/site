#!/bin/bash
for file in *.md 
do
    # Strip frontmatter from file
    echo "Stripping frontmatter from $file"
    tail -n +4 "$file" > temp_md && mv temp_md "$file"
done
