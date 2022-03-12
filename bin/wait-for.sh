#!/bin/sh
# wait-for-postgres.sh

echo "arg1: $1 host: $HOST user: $POSTGRES_USER pw: $POSTGRES_PASSWORD db: $POSTGRES_DB"

set -e

host="$1"
shift
cmd="$@"

until PGPASSWORD=$POSTGRES_PASSWORD psql $POSTGRES_DB -h "$host" -U "$POSTGRES_USER" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd
