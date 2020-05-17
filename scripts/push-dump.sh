#!/usr/bin/env bash

rm -Rf /data/backup/strapi
docker exec imersif_mongo mongodump --host mongo -d strapi -u strapi -p strapi --authenticationDatabase admin -o /data/backup
git add /data/backup/strapi/\\*
git commit -m "Update backup from production"
git push


