#!/bin/bash

. ./.env

export PGPASSWORD=$PG_PASSWORD

psql -h $PG_HOST -p $PG_PORT -U $PG_USER -c "
    drop database if exists $DB_NAME;
" -c "
    create database $DB_NAME;
"

psql -h $PG_HOST -p $PG_PORT -U $PG_USER -d $DB_NAME -c "
    create table usuarios(
    id serial primary key,
    nome varchar(50),
    email varchar(50) unique,
    senha varchar(50)
    );

    create table categorias(
    id serial primary key,
    descricao text
    );

    create table transacoes(
    id serial primary key,
    descricao text,
    valor int,
    data date,
    tipo varchar(7),
    categoria_id int references categorias(id),
    usuario_id int references usuarios(id)
    );

    insert into categorias (descricao) values
    ('Alimentação'),('Assinaturas e Serviços'), ('Casa'), ('Mercado'), ('Cuidados Pessoais'), ('Educação'), ('Família'), ('Lazer'), 
    ('Pets'), ('Presentes'), ('Roupas'), ('Saúde'), ('Transporte'), ('Salário'), ('Vendas'), ('Outras receitas'), ('Outras despesas');
"

echo 'Acho que deu bom!'
