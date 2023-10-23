# Desafio Módulo 2 - Back-end

## Como usar o programa:
Fazer o clone do repositório
- Com https:
```
https://github.com/andrelmmiranda/desafio-backend-modulo-03-sistema-dindin-b2b-ifood-t08.git
```

- Com ssh:
```
git@github.com:andrelmmiranda/desafio-backend-modulo-03-sistema-dindin-b2b-ifood-t08.git
```

Fazer as instalações de dependências:
```
npm install
```

Criar o documento .env utilizando as chaves que estão em .env-example
```
PORT=[PORTA]  // trocar [PORTA] pela porta desejada(ex.: 3000)
SENHA=[SENHA] // trocar [SENHA] pela senha desejada(ex>: 'senha')
```

## Opcional
Para rodar o banco de desenvolvimento local:
```
docker-compose up ou 
docker-compose up -d //modo detached
```

Para criar automaticamente o banco de dados e suas tabelas:
- No Linux
```
sh script.sh
```
- No Windows
```
bash script.sh
```

## Rodar a API
Para rodar a api:
- com nodemon para ambiente de testes:
```
npm run start-dev
```

- sem nodemon para ambiente de produção:
```
npm start
```

## Como testar rotas:
Para testar as rotas disponíveis visitar:
```
http://localhost:{porta}/api-docs/
```
