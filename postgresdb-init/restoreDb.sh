#!/bin/bash
echo "restoring photoapp database"
# pg_restore  -d $POSTGRES_DB ./backups/db_dump.sql
psql -d photoappdb -U allannielsen -f ./backups/db_dump.sql
