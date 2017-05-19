#!/usr/bin/env bash
DATA_API="https://joost.data.freesewing.org"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo "I will save data to $DIR/../json"
echo "Prefetching patterns"
wget -q $DATA_API/patterns -O $DIR/../json/patterns.json
echo "Prefetching pattern map"
wget -q $DATA_API/patternmap -O $DIR/../json/patternmap.json
echo "Prefetching measurements"
wget -q $DATA_API/measurements -O $DIR/../json/measurements.json
echo "Bye"
