#!/usr/bin/env bash

mongorestore --drop --host mongo -d strapi -u strapi -p strapi --authenticationDatabase admin /data/backup/strapi
