#!/bin/sh

set -e

check_db() {
  echo "Checking if database exists..."
  rails db:exists > /dev/null 2>&1
}

if check_db; then
  echo "Database exists. Skipping creation."
  rails db:migrate db:seed
else
  echo "Database does not exist. Running setup..."
  rails db:create db:migrate db:seed
fi

echo "Starting Rails server..."
exec "$@"
