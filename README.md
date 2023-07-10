# 2023-1-PUMA-UserService

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2023-1-PUMA-UserService&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2023-1-PUMA-UserService) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2023-1-PUMA-UserService&metric=coverage)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2023-1-PUMA-UserService) [![npm version](https://img.shields.io/badge/npm--express-v4.17.1-blue)](https://www.npmjs.com/package/express/v/4.17.1)

## Objetivo

Desenvolvido para manter o controle de usuários, desde sua criação até o controle das rotas de acesso permitidas, criação de times dentre outros.
Esse serviço é responsável por lidar com todas as operações que envolvem usuários no projeto Puma. Utiliza das entidades USER, STUDENT, PROFESSOR, JURIDICAL_AGENT e PHYSICAL_AGENT no banco de dados.

## Endpoints

### Registrar 

Esse endpoint é usado para resgistrar um usuário baseado em seu tipo.

#### POST  
```
/register 
```
##### Body

###### Aluno
```
{
  type: "Aluno", 
  name: <nome>, 
  email: <email>, 
  matricula: <matricula>, 
  password: <senha>, 
  repeatPassword: <senha>, 
  phoneNumber: <telefone>
} 

```
###### Professor
```
{
  type: "Professor", 
  name: <nome>, 
  email: <email>, 
  matricula: <matricula>, 
  password: <senha>, 
  repeatPassword: <senha>, 
  phoneNumber: <telefone>
} 
```
###### Agente Externo: PJ
```
{
  type: "Agente Externo", 
  cnpj: <cnpj>, 
  companyName: <nome_empresa>, 
  socialReason: <razao_social>, 
  externalAgentType: "Pessoa Juridica", 
  email: <email>, 
  name: <nome>, 
  password: <senha>, 
  repeatPassword: <senha>, 
  phoneNumber:  <telefone>
}
```
###### Agente Externo: PF
```
{
  type: "Agente Externo", 
  cnpj: <cnpj>, 
  companyName: <nome_empresa>, 
  socialReason: <razao_social>, 
  externalAgentType: "Pessoa Fisica", 
  email: <email>, 
  name: <nome>, 
  password: <senha>, 
  repeatPassword: <senha>, 
  phoneNumber:  <telefone>
}
```
 
### Entrar 

Esse endpoint é usado para entrar na aplicação pelo seu usuário: email e senha.

#### POST  
```
/login
body: {
        email: <email>,  
        password: <senha>, 
} 
```
 
### Aluno 

Esse endpoint é usado para 'pegar' um usuário Aluno através da matricula.

#### GET  
```
/aluno/:matriculaId 
```

### Nova senha

Esse endpoint é usado para fazer um nova senha para um Usuário baseado em seu e-mail e nova senha enviada.

#### PUT 
```
/password/:email
body: {password: <password>}
```

### Recuperar senha

Esse endpoint é usado para recuperar uma senha através do email.

#### POST 
```
/recover 
body: {email: <email>}
```
 

### Como rodar

Para utilizar o projeto com todos os microsserviços, siga as intruções de como rodar no [Api Gateway](https://github.com/fga-eps-mds/2023-1-PUMA-ApiGateway). Para buildar e iniciar este serviço individualmente, execute:

``` $ make dev ```

Para apenas buildar, execute:

```$ make build ```

Para apenas iniciar, execute:

```$ make run ```

Para encerrar os containers de desenvolvimento execute:

``` $ make down ```

Para rodar os testes, execute:

``` $ npm run test ```

É necessário preencher o arquivo .env na raiz com as informações necessárias.
