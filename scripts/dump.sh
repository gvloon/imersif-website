#!/usr/bin/env bash

mongodump --host mongo -d strapi -u strapi -p strapi --authenticationDatabase admin -o /data/backup
