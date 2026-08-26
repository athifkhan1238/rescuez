#!/bin/sh
set -eu
mkdir -p backups
ts=$(date +%Y%m%d-%H%M%S)
cp data/data.json "backups/data-$ts.json"
ls -1t backups/data-*.json | tail -n +8 | xargs -r rm -f
echo "Backup created: backups/data-$ts.json"
