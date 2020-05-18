#!/usr/bin/env bash

pushd $(dirname "$0")/../../

rm -Rf data/backup/strapi
docker exec imersif_mongo mongodump --host mongo -d strapi -u strapi -p strapi --authenticationDatabase admin -o /data/backup

popd