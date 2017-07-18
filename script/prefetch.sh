#!/usr/bin/env bash
DATA_API="https://joost.data.freesewing.org"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo "Saving info as JSON to $DIR/../json"
wget -q $DATA_API/info/json -O $DIR/../json/freesewing.json
echo "Saving info as YAML to $DIR/../_data"
wget -q $DATA_API/info/yaml -O $DIR/../_data/freesewing.yaml
echo "Bye"
