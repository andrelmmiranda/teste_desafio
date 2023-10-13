#!/bin/bash

. ./.env

export PGPASSWORD=$PG_PASSWORD

psql -h $PG_HOST -p $PG_PORT -U $PG_USER -c "

create database $DB_NAME"

psql -h $PG_HOST -p $PG_PORT -U $PG_USER -d dindin -c "

create table teste(
    id serial,
    nome varchar(20)
);
"

echo 'A parada rodou, vê se deu tudo certo'
