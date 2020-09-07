#!/usr/bin/env bash
pushd $(dirname "$0")/../ > /dev/null

docker exec imersif_mongo mongorestore --drop --host mongo -d strapi -u strapi -p strapi --authenticationDatabase admin /data/backup/strapi

popd > /dev/null