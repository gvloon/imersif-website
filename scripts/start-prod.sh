#!/usr/bin/env bash
pushd $(dirname "$0")/../ > /dev/null
set -a
. .env
set +a

cp config/prod/strapi.js strapi/src/config/properties.js
cp config/prod/next.js next/src/config/properties.js

docker-compose -f docker-compose.yml -f docker-compose-prod.yml down --remove-orphans
docker-compose -f docker-compose.yml -f docker-compose-prod.yml build --no-cache
docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d

printf "Waiting for containers "
scripts/wait.sh http://localhost:$STRAPI_PORT
scripts/wait.sh http://localhost:$ELASTIC_PORT

echo ""
printf "Indexing elastic: "
scripts/index-elastic.sh

echo ""
echo "All running"

popd > /dev/null