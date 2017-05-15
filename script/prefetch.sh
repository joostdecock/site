#!/usr/bin/env bash
DATA_API="http://dta.freesewing.org"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo "I will save data to $DIR/../json"
echo "Prefetching patterns"
wget -q $DATA_API/patterns -O $DIR/../json/patterns.json
echo "Prefetching measurements"
wget -q $DATA_API/measurements -O $DIR/../json/measurements.json
echo "Bye"
