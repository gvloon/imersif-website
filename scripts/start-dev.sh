#!/usr/bin/env bash
pushd $(dirname "$0")/../ > /dev/null
set -a
. .env
set +a

while [[ "$#" -gt 0 ]]; do
    case $1 in
        -i|--import) IMPORT=1 ;;
    esac
    shift
done

docker-compose down --remove-orphans
docker-compose up -d

printf "Waiting for containers "
scripts/wait.sh http://localhost:$STRAPI_PORT
scripts/wait.sh http://localhost:$ELASTIC_PORT
echo ""

if [ "$IMPORT" == 1 ]
then
  echo "Importing data"
  scripts/restore-mongo.sh > /dev/null
fi

printf "Indexing elastic: "
scripts/index-elastic.sh
echo ""

echo "All running"

popd > /dev/null

pushd $(dirname "$0")/../next/ > /dev/null

yarn dev

popd > /dev/null
