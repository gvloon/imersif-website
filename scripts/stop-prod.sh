#!/usr/bin/env bash
pushd $(dirname "$0")/../ > /dev/null
set -a
. .env
set +a

docker-compose -f docker-compose.yml -f docker-compose-prod.yml down --remove-orphans

popd > /dev/null