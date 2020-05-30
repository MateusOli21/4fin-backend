# 4Fin - API

## Introdução

O 4Fin consiste em uma plataforma de controle financeiro, onde o usuários podem manter o registro de suas compras e gastos, além de terem uma visão geral de como estão seus gastos e economias. Essa aplicação é baseada em uma aplicação chamada "Meu cofrinho", desenvolvida em python durante meu período na faculdade.

A API, que é desenvolvida utilizando NodeJS, é responsável criação e edição de usuários, compras e categorias, pela comunicação com banco de dados, além da autenticação do usuário no sistema.

## Rotas da aplicação

A aplicação contém duas rotas públicas que permitem o usuário criar uma conta e fazer login. As demais rotas são protegidas, podendo ser acessadas somente através de um token de autorização JWT disponibilizado ao realizar o login.

Esse token deve ser enviado atráves do cabeçalho de todas as requisições em rotas privadas como Bearer token.

Tanto o corpo quanto as respostas das requisições são no formato JSON.

## Rotas públicas

### Criar usuário

```
POST /users
```

Exemplo de corpo da requisição:

```
{
	"name": "teste",
	"email": "testes@teste.com",
	"password": "123456"
}
```

A resposta retorna o nome, email e id do usuário criado.

#### Fazer login na sessão

```
POST /sessions
```

Exemplo de corpo da requisição:

```
{
	"email": "testes@teste.com",
	"password": "123456"
}
```

Resposta:

```
{
  "user": {
    "profile": {
      "id": 1,
      "name": "Teste",
      "email": "teste@teste.com",
      "avatar": null,
      "spend_limit": null
    },
    "categories": [],
    "purchases": []
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNTkwMjUxODQ3LCJleHAiOjE1OTA4NTY2NDd9.85qOxbrXLi_G5Khm3ZpKjL0jDYmFDnygESQt3ywUC0"
}
```

> A resposta desta requisição buscará todas as informações pertencentes ao usuário como perfil, compras e categorias. além do token JWT.

## Rotas Privadas

### Rotas de usuário

#### Enviar arquivo

```
POST /files
```

Essa requisição deve ser feita usando Multipart Form, enviando como file e o arquivo desejado.

#### Atualizar informações de usuário

```
PUT /users
```

Exemplo de corpo da requisição:

```
{
	"name": "",
	"email": "",
	"spend_limit": 10,
    "oldPassword": "",
    "newPassord": "",
    "confirmPassword": "",
}
```

A resposta retorna todas as informações atualizadas e id do usuário.

---

### Rotas de categorias

#### Listar categorias

```
GET /categories
```

A resposta retorna a lista de todas as categorias.

#### Criar categoria

```
POST /categories
```

Exemplo de corpo da requisição:

```
{
	"name": "food",
	"max_value": 200
}
```

A resposta retorna as informações da categoria e o id.

#### Atualizar categoria

```
PUT /categories/:id
```

O corpo dessa requisição é o mesmo da criar categoria, mas com as informações novas. A resposta retorna as novas informações e o id da categoria.

#### Deletar categoria

```
DELETE /categories/:id
```

---

### Rotas de compras

#### Listar compras

```
GET /purchases
```

A resposta retorna a lista de todas as compras.

#### Criar compra

```
POST /purchases
```

Exemplo de corpo da requisição:

```
{
	"name": "ifood",
	"value": 50,
	"date": "2020-05-20T10:00:00-03:00",
	"category_id": 1
}
```

A resposta retorna as informações da compra e o id.

#### Atualizar compra

```
PUT /purchases/:id
```

O corpo dessa requisição é o mesmo da criar compra, mas com as informações novas. A resposta retorna as novas informações e o id da categoria.

#### Deletar compra

```
DELETE /purchases/:id
```
