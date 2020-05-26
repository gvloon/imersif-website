#!/usr/bin/env bash

rm -Rf /data/backup/strapi
mongodump --host mongo -d strapi -u strapi -p strapi --authenticationDatabase admin -o /data/backup
