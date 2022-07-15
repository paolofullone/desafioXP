
## Referências da API 

#### Requisições para Investimento => Compra

```http
  POST /investimentos/comprar
```

| Parametro | Tipo     | Descrição                           |
| :-------- | :------- | :------------------------- |
| `codCliente` | `integer` | **Required**. código do cliente (identificador único) |
| `codAtivo` | `integer` | **Required**. código de identificação única do ativo|
| `qtdeAtivo` | `integer` | **Required**. quantidade de ações a serem compradas |

##### Validações a serem feitas:
    1. Quantidade de ativo a ser comprada não pode ser maior que a quantidade disponível na corretora.

O endpoint recebe como entradas o id do ativo, a quantidade de ações vendidas, número da conta vendedora.

#### Requisições para Investimento => Venda

```http
  POST /investimentos/vender
```

| Parametro | Tipo     | Descrição                           |
| :-------- | :------- | :------------------------- |
| `codCliente` | `integer` | **Required**. código do cliente (identificador único) |
| `codAtivo` | `integer` | **Required**. código de identificação única do ativo|
| `qtdeAtivo` | `integer` | **Required**. quantidade de ações a serem vendidas |

##### Validações a serem feitas:
    1. Quantidade de ativo a ser vendida não pode ser maior que a quantidade disponível na carteira.

#### Requisições para Investimento => Consulta de Ativos

```http
  GET BY CLIENT /ativos/{cod-cliente}
```

| Parametro | Tipo     | Descrição                           |
| :-------- | :------- | :------------------------- |
| `codCliente` | `integer` | **Required**. código de identificação única da pessoa cliente |

Endpoint retorna o CodCliente, CodAtivo, QtdeAtivo e Valor.

##### Validações a serem feitas:
    1. O cliente existe na base de dados e se trata do mesmo cliente que está solicitando os dados.


#### Requisições para Investimento => Consulta de Ativo

```http
  GET BY ASSETS /ativos/{cod-ativo}
```

| Parametro | Tipo     | Descrição                           |
| :-------- | :------- | :------------------------- |
| `codAtivo` | `integer` | **Required**. código de identificação única do ativo |

Endpoint retorna o CodCliente, QtdeAtivo e Valor.

##### Validações a serem feitas:
    1. O cliente existe na base de dados e se trata do mesmo cliente que está solicitando os dados.


#### Requisições para Depósitos e Saques => Depósitos

```http
  POST /conta/deposito
```

| Parametro | Tipo     | Descrição                           |
| :-------- | :------- | :------------------------- |
| `codCliente` | `integer` | **Required**. Código de identificação única da pessoa cliente |
| `Valor` | `integer` | **Required**. Valor do depósito |

Endpoint retorna uma mensagem de depósito efetuado.

##### Validações a serem feitas:
    1. Quantidade a ser depositada não poderá ser negativa ou igual a zero.


#### Requisições para Depósitos e Saques => Saques

```http
  POST /conta/saque
```

| Parametro | Tipo     | Descrição                           |
| :-------- | :------- | :------------------------- |
| `codCliente` | `integer` | **Required**. Código de identificação única da pessoa cliente |
| `Valor` | `integer` | **Required**. Valor do depósito |

Endpoint retorna uma mensagem de saque efetuado.

##### Validações a serem feitas:
    1. Quantidade a ser sacada não poderá ser maior que o saldo da conta; não pode ser negativa e não pode ser igual a zero.


#### Requisições para Depósitos e Saques => Saldo

```http
  GET /conta/{cod-cliente}
```

| Parametro | Tipo     | Descrição                           |
| :-------- | :------- | :------------------------- |
| `codCliente` | `integer` | **Required**. Código de identificação única da pessoa cliente |

Endpoint retorna uma mensagem com o saldo da conta em formato decimal.

