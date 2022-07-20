DROP DATABASE IF EXISTS Desafio_XP;

CREATE DATABASE Desafio_XP;

USE Desafio_XP;

CREATE TABLE
    `users`(
        `user_id` VARCHAR(255) PRIMARY KEY,
        `email` VARCHAR(255) NOT NULL UNIQUE,
        `password` VARCHAR(255) NOT NULL,
        `name` VARCHAR(255) NOT NULL,
        `ballance` DECIMAL(8, 2) NOT NULL,
        `role` VARCHAR(255) NOT NULL,
        `created_at` DATETIME,
        `updated_at` DATETIME
    );

CREATE TABLE
    `stocks`(
        `stock_id` VARCHAR(255) PRIMARY KEY,
        `available_quantity` INT NOT NULL,
        `value` DECIMAL(8, 2) NOT NULL,
        `ticker` VARCHAR(255) NOT NULL UNIQUE,
        `name` VARCHAR(255) NULL,
        `created_at` DATETIME,
        `updated_at` DATETIME
    );

CREATE TABLE
    `stock_client_ops` (
        `op_id` VARCHAR(255) PRIMARY KEY,
        `stock_id` VARCHAR(255),
        `user_id` VARCHAR(255),
        `quantity` INT NOT NULL,
        `value` DECIMAL(8, 2) NOT NULL,
        `operation` VARCHAR(255) NOT NULL,
        `created_at` DATETIME,
        `updated_at` DATETIME
    );

INSERT INTO
    `users` (
        `user_id`,
        `email`,
        `password`,
        `name`,
        `ballance`,
        `role`,
        `created_at`,
        `updated_at`
    )
VALUES (
        'cabfd67e-15e9-4e08-a8ad-0c65f5ed717a',
        'paolo@xpinc.com',
        '@PaoloNaXPInc2022',
        'Paolo',
        '100000.00',
        'admin',
        NOW(),
        NOW()
    ), (
        '4907c20d-4d8e-4714-a8d2-fc9138602f80',
        'luca@xpinc.com',
        '123456',
        'Luca',
        '100000.00',
        'client',
        NOW(),
        NOW()
    ), (
        'b89f147d-c12c-407a-b3e6-49b5da633021 ',
        'admin@xpinc.com',
        '123456',
        'Admin',
        '0.00',
        'admin',
        NOW(),
        NOW()
    );

INSERT INTO
    `stocks` (
        `stock_id`,
        `available_quantity`,
        `value`,
        `ticker`,
        `name`,
        `created_at`,
        `updated_at`
    )
VALUES (
        '670ef6c0-5f48-450d-afc8-e2794d19a49a',
        '98000',
        '10.00',
        'XPINC',
        'XP INC.',
        NOW(),
        NOW()
    ), (
      'fe1f3d59-0dde-4b55-af4f-788bd8f7dd9e',
      '98000',
      '10.00',
      'GGBR4',
      'GERDAU',
      NOW(),
      NOW()
    ),    
    (
        '3f335ba1-5f8a-4b50-b309-3bdcfffb3040',
        '99000',
        '10.00',
        'VALE5',
        'VALE',
        NOW(),
        NOW()
    );

INSERT INTO
    `stock_client_ops` (
        `op_id`,
        `stock_id`,
        `user_id`,
        `quantity`,
        `value`,
        `operation`,
        `created_at`,
        `updated_at`
    )
VALUES (
        'a3e53067-142b-4b9a-aae7-ebb79e42a4a0',
        '670ef6c0-5f48-450d-afc8-e2794d19a49a',
        'cabfd67e-15e9-4e08-a8ad-0c65f5ed717a',
        '200',
        '100.00',
        'buy',
        NOW(),
        NOW()
    ), (
        'fcb0082b-c505-4d5e-a0dc-24b159e64138',
        '3f335ba1-5f8a-4b50-b309-3bdcfffb3040',
        '4907c20d-4d8e-4714-a8d2-fc9138602f80',
        '100',
        '100.00',
        'buy',
        NOW(),
        NOW()
    )