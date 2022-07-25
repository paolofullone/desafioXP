const users = [
  {
    user_id: '4907c20d-4d8e-4714-a8d2-fc9138602f80',
    cpf: '12345678902',
    email: 'luca@xpinc.com',
    password: '@PaoloNaXPInc2022',
    user_name: 'Luca',
    ballance: '100000.00',
    role: 'client',
    created_at: '2022-07-17T18:52:57.000Z',
    updated_at: '2022-07-17T18:52:57.000Z',
  },
  {
    user_id: 'b89f147d-c12c-407a-b3e6-49b5da633021',
    cpf: '12345678903',
    email: 'admin@xpinc.com',
    password: '@PaoloNaXPInc2022',
    user_name: 'Admin',
    ballance: '0.00',
    role: 'admin',
    created_at: '2022-07-17T18:52:57.000Z',
    updated_at: '2022-07-17T18:52:57.000Z',
  },
  {
    user_id: 'cabfd67e-15e9-4e08-a8ad-0c65f5ed717a',
    cpf: '12345678901',
    email: 'paolo@xpinc.com',
    password: '@PaoloNaXPInc2022',
    user_name: 'Paolo',
    ballance: '100000.00',
    role: 'admin',
    created_at: '2022-07-17T18:52:57.000Z',
    updated_at: '2022-07-17T18:52:57.000Z',
  },
];

const admin = [
  {
    user_id: 'b89f147d-c12c-407a-b3e6-49b5da633021 ',
    email: 'admin@xpinc.com',
    password: '123456',
    user_name: 'Admin',
    ballance: '0.00',
    role: 'admin',
    created_at: '2022-07-17T17:19:16.000Z',
    updated_at: '2022-07-17T17:19:16.000Z',
  },
];

const user = [{
  user_id: 'cabfd67e-15e9-4e08-a8ad-0c65f5ed717a',
  email: 'paolo@xpinc.com',
  cpf: '12345678901',
  password: '@PaoloNaXPInc2022',
  user_name: 'Paolo',
  ballance: '100000.00',
  role: 'admin',
  created_at: '2022-07-17T17:19:16.000Z',
  updated_at: '2022-07-17T17:19:16.000Z',
},
];

const result = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
  },
];

const mockToken = {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhb2xvQHhwaW5jLmNvbSIsInVzZXJJZCI6ImNhYmZkNjdlLTE1ZTktNGUwOC1hOGFkLTBjNjVmNWVkNzE3YSIsImlhdCI6MTY1ODUxNjk2MCwiZXhwIjoxNjU5MzgwOTYwfQ.ZiPPRk3np-cdcep7d_TUfv4CpsmltLFi4NUsr5M6vmg"
}

const stocks = [
  {
    "stock_id": "3f335ba1-5f8a-4b50-b309-3bdcfffb3040",
    "available_quantity": 98800,
    "value": "10.0000",
    "ticker": "VALE5",
    "name": "VALE",
    "created_at": "2022-07-23T00:33:20.000Z",
    "updated_at": "2022-07-23T00:33:20.000Z"
  },
  {
    "stock_id": "670ef6c0-5f48-450d-afc8-e2794d19a49a",
    "available_quantity": 97800,
    "value": "10.0000",
    "ticker": "XPINC",
    "name": "XP INC.",
    "created_at": "2022-07-23T00:33:20.000Z",
    "updated_at": "2022-07-23T00:33:20.000Z"
  },
  {
    "stock_id": "fe1f3d59-0dde-4b55-af4f-788bd8f7dd9e",
    "available_quantity": 98000,
    "value": "10.0000",
    "ticker": "GGBR4",
    "name": "GERDAU",
    "created_at": "2022-07-23T00:33:20.000Z",
    "updated_at": "2022-07-23T00:33:20.000Z"
  }
]

const requestedOperations = [
  {
    "stockId": "670ef6c0-5f48-450d-afc8-e2794d19a49a",
    "quantity": 20
  },
  {
    "stockId": "3f335ba1-5f8a-4b50-b309-3bdcfffb3040",
    "quantity": 20
  }
]

const dbReturn = [{
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0
}]

module.exports = {
  users,
  admin,
  user,
  result,
  mockToken,
  stocks,
  requestedOperations,
  dbReturn
};
