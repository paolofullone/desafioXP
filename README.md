
# Desafio Técnico XP Inc

Desafio técnico realizado em Julho/22 para BackEnd no processo seletivo da XP Inc. focado na turma XP da Trybe.

Breve descrição:
Desenvolver uma aplicação que se assemelha ao nosso dia a dia, um aplicativo de investimento em ações, com algumas funcionalidades de conta digital.

As entidades que implementei foram:
- Users => gerencia os usuários, cadastros, login, delete, update;
- Stocks => gerencia as ações, cadastro, busca de todas ações, busca por ID.
- StocksOps => gerencia todas as compras e vendas de ações.


## Apêndice

Realizei o projeto em Nodejs, utilizando a estrutura de Model / Service / Controller.

Neste desafio técnico optei por não realizar nenhuma validação nos CPFs informados no momento do cadastro de uma nova pessoa usuária. Desta forma não é necessário informar um CPF real. 

Fiz os testes utilizando o Mocha, Chai e Sinon e optei por testar as três camadas da entidade User.

Para a entidade User implementei os 4 verbos do CRUD, apesar de não ter sido solicitado no desafio.

Utilizei o JWT para validação e controle de tempo de sessão da pessoa usuária.
## Stack utilizada

**Back-end:** Node, Express, JWT, MySQL, Swagger, Swagger-jsdoc.

**Testes:** Mocha, chai, sinon.

## Implementações extras:

Fiz algumas implementações extras e pequenas alterações nas rotas solicitadas. As rotas solicitadas (requisitos mínimos) foram:
- investimentos/comprar (POST)
- investimentos/vender (POST)
- /ativos/{cod-cliente} (GET) => wallet
- /conta/deposito (POST)
- /conta/saque (POST)
- /conta/{cod-cliente} (GET) => saldo em conta

Modificações em relações as rotas propostas:
- /ativos/{cod-cliente} (GET) => wallet ===> /investimentos/{cod-cliente}
- /conta/deposito (POST) ===> /users/conta/deposito
- /conta/saque (POST) ===> /users/conta/saque
- /conta/{cod-cliente} (GET) => saldo em conta ===> /users/conta/saldo

Além das rotas acima, implementei as seguintes rotas:
- /login
- /investimentos => todas as operações de todas as pessoas usuárias (requer admin)
- /investimentos/{cod-cliente} => todas as operações da pessoa logada
- /ativos (GET) => todos os ativos cadastrados no banco (requer admin)
- /ativos (POST) => criação de nova ação no bd
- /ativos/{cod-ativo} => recupera todas as informações do ativo (inclusve qtd disponível para negociação)
- /users (GET) => todos os usuários disponíveis no bd (requer admin)
- /users (POST) => cria um novo usuário
- /users/{cod-cliente} (GET) => dados do usuário logado
- /users (DELETE) => deleta um usuário (requer admin)
- /users/{cod-cliente} (PUT) => atualiza informações do usuário



## Documentação da API

A documentação da API foi realizada utilizando o Swagger e pode ser acessada neste [endereço](https://desafioxp.herokuapp.com/docs).

Para fins de avaliação, algumas rotas privadas e acesso admin foram disponibilizados de forma pública no Swagger.






## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:paolofullone/desafioXP.git
```

Entre no diretório do projeto:

```bash
  cd desafioXP
```

Instale as dependências:

```bash
  npm install
```

**Crie o arquivo dotenv conforme .env.example (ou seção "Variáveis de Ambiente")**

Inicie o servidor utilizando o docker compose:

```bash
  docker-compose up -d
```

Veja os logs da aplicação acessando os logs do docker:

```bash
  npm run dockerlogs
```
## Rodando os testes

Para rodar os testes, execute o seguinte comando:

```bash
  npm run test:coverage
```


## Deploy

O deploy deste projeto foi realizado no [Heroku](https://desafioxp.herokuapp.com/). 

Utilizei CI/CD com a Dockerfile e main.yml do Github e configurações adicionais no Heroku.




## Aprendizados

Durante a primeira etapa deste projeto, abri o home brooker da XP de uma forma diferente, buscando entender como cada parte funcionava do ponto de vista de código.

Minha primeira grande dificuldade foi modelar o banco de dados (e remodelei algumas vezes, talvez mais de uma dezenha de vezes). Detalhes como qual tipo de dado devo utilizar para os campos de saldo, preço etc nunca havia pesquisado.

Ao elaborar os testes e ao elaborar a documentação em Swagger, o efeito colateral foram diversas refatorações do código.





## Melhorias Futuras

Além das funcionalidades extras que implementei, poderia implementar uma criptografia dos dados de senhas, como o bcrypt por exemplo.

Aplicação de todos os verbos do CRUD para todas as entidades.




## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`MYSQL_HOST`
`MYSQL_USER`
`MYSQL_PASWORD`
`MYSQL_DATABASE`
`PORT`
`JWT_SECRET`

## Feedback

Se você tiver algum feedback, dúvida ou sugestão, entre em contato via linkedin e ficarei muito grato.


## Autor

- [@paolofullone](https://www.github.com/in/paolofullone)

