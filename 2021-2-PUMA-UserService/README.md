# 2021-1-PUMA-UserService

[![Build Status](https://dev.azure.com/puma-eps/Puma/_apis/build/status/UserService-CI)](https://dev.azure.com/puma-eps/Puma/_build/latest?definitionId=6)
![Azure DevOps coverage](https://img.shields.io/azure-devops/coverage/puma-eps/Puma/6?style=flat-square)

## Objetivo

Esse serviço é responsável por lidar com todas as operações que envolvem usuários no projeto Puma.

### Como rodar

Para utilizar o projeto com todos os microsserviços, siga as intruções de como rodar no [Api Gateway](https://github.com/fga-eps-mds/2021-1-PUMA-ApiGateway). Para rodar este serviço individualmente, execute:

``` $ sudo docker build -t userservice -f dev.Dockerfile . ```

``` $ sudo docker run -p 3001:3001 userservice ```

Para rodar os testes unitários, execute:

``` $ sudo make test ```

É necessário preencher o arquivo .env na raiz com as informações necessárias
