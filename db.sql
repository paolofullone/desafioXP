DROP DATABASE IF EXISTS Desafio_XP;

CREATE DATABASE Desafio_XP;

USE Desafio_XP;

CREATE TABLE
    `clients`(
        `client_id` VARCHAR(255) PRIMARY KEY,
        `email` VARCHAR(255) NOT NULL UNIQUE,
        `password` VARCHAR(255) NOT NULL,
        `user_name` VARCHAR(255) NOT NULL,
        `account_balance` DECIMAL(8, 2) NOT NULL,
        `created_at` DATETIME,
        `updated_at` DATETIME
    );

CREATE TABLE
    `stocks`(
        `stock_id` VARCHAR(255) PRIMARY KEY,
        `quantity` INT NOT NULL,
        `value` DECIMAL(8, 2) NOT NULL,
        `ticker` VARCHAR(255) NOT NULL UNIQUE,
        `name` VARCHAR(255) NULL,
        `created_at` DATETIME,
        `updated_at` DATETIME
    );

CREATE TABLE
    `stock_client_ops` (
        `stock_id` VARCHAR(255),
        `client_id` VARCHAR(255),
        `quantity` INT NOT NULL,
        `value` DECIMAL(8, 2) NOT NULL,
        `operation` VARCHAR(255) NOT NULL,
        `created_at` DATETIME,
        `updated_at` DATETIME,
        PRIMARY KEY (`stock_id`, `client_id`)
    );

INSERT INTO
    `clients` (
        `client_id`,
        `email`,
        `password`,
        `user_name`,
        `account_balance`,
        `created_at`,
        `updated_at`
    )
VALUES (
        'cabfd67e-15e9-4e08-a8ad-0c65f5ed717a',
        'paolo@xp.com',
        '123456',
        'Paolo',
        '0.00',
        NOW(),
        NOW()
    ), (
      '4907c20d-4d8e-4714-a8d2-fc9138602f80',
      'luca@xpinc.com',
      '123456',
      'Luca',
      '1000.00',
      NOW(),
      NOW()
    );

INSERT INTO
    `stocks` (
        `stock_id`,
        `quantity`,
        `value`,
        `ticker`,
        `name`,
        `created_at`,
        `updated_at`
    )
VALUES (
        '670ef6c0-5f48-450d-afc8-e2794d19a49a',
        '100000',
        '10.00',
        'PETR4',
        'PETROBRAS',
        NOW(),
        NOW()
    ), (
        '3f335ba1-5f8a-4b50-b309-3bdcfffb3040 ',
        '100000',
        '10.00',
        'VALE5',
        'VALE',
        NOW(),
        NOW()
    );
  

INSERT INTO
    `stock_client_ops` (
        `stock_id`,
        `client_id`,
        `quantity`,
        `value`,
        `operation`,
        `created_at`,
        `updated_at`
    )
VALUES (
        'cc458bbb-98a4-471e-81d3-ad76236ebf14 ',
        '75e72c93-975d31',
        '100',
        '100.00',
        'buy',
        NOW(),
        NOW()
    );