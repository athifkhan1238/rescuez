#!/bin/sh
set -eu
if [ ! -f .env ]; then cp .env.example .env; echo "Edit .env and set ADMIN_PASSWORD, then run again."; exit 1; fi
set -a; . ./.env; set +a
node server.js
