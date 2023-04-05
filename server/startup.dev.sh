set -e

/opt/wait-for-it.sh postgres:5432
yarn migration:run
yarn seed:run
yarn start:prod