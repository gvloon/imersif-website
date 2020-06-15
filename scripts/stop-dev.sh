#!/usr/bin/env bash
pushd $(dirname "$0")/../ > /dev/null
set -a
. .env
set +a

docker-compose down --remove-orphans

popd > /dev/null