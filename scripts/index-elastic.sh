#!/usr/bin/env bash
pushd $(dirname "$0")/../ > /dev/null
set -a
. .env
set +a

curl http://localhost:$STRAPI_PORT/system/update-search

popd > /dev/null