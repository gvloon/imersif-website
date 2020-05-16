#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
docker exec imersif_mongo mongodump -d strapi -u strapi -p strapi --authenticationDatabase admin -o /data/db/backup
docker cp imersif_mongo:/data/db/backup/strapi $BASEDIR/../backup