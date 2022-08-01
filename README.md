# 2022-1-PUMA-UserService

## Objetivo

Esse serviço é responsável por lidar com todas as operações que envolvem usuários no projeto Puma.

### Como rodar

Para utilizar o projeto com todos os microsserviços, siga as intruções de como rodar no [Api Gateway](https://github.com/fga-eps-mds/2021-1-PUMA-ApiGateway). Para rodar este serviço individualmente, execute:

``` $ sudo docker build -t userservice -f dev.Dockerfile . ```

``` $ sudo docker run -p 3001:3001 userservice ```

Para rodar os testes, execute:

``` $ sudo make test```

``` $ sudo make test-debug```

É necessário preencher o arquivo .env na raiz com as informações necessárias.
