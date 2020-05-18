#!/usr/bin/env bash

pushd $(dirname "$0")/../../

rm -Rf data/backup/strapi
git pull
docker exec imersif_mongo mongodump --host mongo -d strapi -u strapi -p strapi --authenticationDatabase admin -o /data/backup
git add data/backup/strapi/*
git commit -m "Update backup from production"
sudo -u gdh_van_loon git push

popd
