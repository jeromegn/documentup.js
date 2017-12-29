#!/bin/sh

set -e

flybaseurl=${FLY_BASE_URL:-"https://fly.io"}

curl -i -X PUT -F 'script=@dist/documentup.js' \
  -H "Authorization: Bearer $FLY_ACCESS_TOKEN" \
  $flybaseurl/api/v1/sites/js-documentup-com/script