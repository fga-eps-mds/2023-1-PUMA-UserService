# 2022-1-PUMA-UserService

## Objetivo

Esse serviço é responsável por lidar com todas as operações que envolvem usuários no projeto Puma. Utiliza das entidades COMMON_USER, STUDENT, PROFESSOR, JURIDICAL_AGENT e PHYSICAL_AGENT no banco de dados.

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

Para utilizar o projeto com todos os microsserviços, siga as intruções de como rodar no [Api Gateway](https://github.com/fga-eps-mds/2021-1-PUMA-ApiGateway). Para rodar este serviço individualmente, execute:

``` $ sudo docker build -t userservice -f dev.Dockerfile . ```

``` $ sudo docker run -p 3001:3001 userservice ```

Para rodar os testes, execute:

``` $ sudo make test```

``` $ sudo make test-debug```

É necessário preencher o arquivo .env na raiz com as informações necessárias.
