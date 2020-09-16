# Short Url Project

O Projeto Short Url tem como função replicar de forma semelhante as mesmas funcionalidades encontradas em serviços de encurtamento de URL, como por exemplo: bit.ly, TinyURL.

## Instalação

Após extrair os arquivos, no diretorio `/shortUrl` utilizar os comandos abaixo:

```bash
docker-compose build && docker-compose up -d
```

As seguintes portas listadas abaixo precisam estar desocupadas para o serviço de Mysql e API respectivamente:

**Portas**: `3306:3306 e 3000:3000`

O banco irá ser carregado sem nenhum dado em qualquer tabela.

## Arquitetura

Foram utilizados dois containers para subir a aplicação. Um container contém o DB e o outro container contem a API. A API se comunica através de uma bridge com o banco de dados. Também foi utilizado o /docker-entrypoint-initdb.d para inicialização de arquivos do DB. 

![alt text](https://i.imgur.com/q68HS6S.png)

A aplicação possui uma tendência ao desing pattern MVC. 

## Lista de end points disponíveis na aplicação:

- POST /users/:userid/urls 
- GET /stats 
- GET /urls/:id 
- GET /users/:userId/stats 
- GET /stats/:id 
- DELETE /urls/:id 
- POST /users 
- DELETE /user/:userId

Todos os end points utilizam de validações com o JOI.

`A criação de testes unitários não foi possível de ser executada. O Jest foi instalado nas dependências de desenvolvimento e existe uma pasta __testes__ que foi criada, porém não houve tempo hábil para executar os testes.`  

## Versionamento 

Foi utilizado o GitHub para controle de PR's e o versionamento do projeto. O trello também foi utilizado para criação de cards nomeados com tags, nas quais correspondem aos nomes das branchs criadas. Cada nova feature carrega a branch Master + o desenvolvimento da própria feature. Isso permite um controle mais adequado e maior segurança em merges. 

## Postman Collection com todos os end points.

[Short Url Project Collection](https://www.getpostman.com/collections/621f600481de63c23a6f)


## Tabela de configuração

**Variáveis de configurações** : Na Tabela `app_config_variables` é possível ajustar a quantidade de URLS mais acessadas, tanto no end point de stas globais quanto no end point de stats por user. Por default os valores são os solicitados no escopo do projeto, `10`. Para ajustar os valores, basta rodar um simples comando de UPDATE na tabela `app_config_variables`, setando o valor do campo `cfg_value` para o valor desejado.
