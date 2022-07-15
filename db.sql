DROP DATABASE IF EXISTS Desafio_XP;

CREATE DATABASE Desafio_XP;

USE Desafio_XP;

CREATE TABLE
    `clients`(
        `client_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `email` VARCHAR(255) NOT NULL UNIQUE,
        `password` VARCHAR(255) NOT NULL,
        `user_name` VARCHAR(255) NOT NULL,
        `account_balance` DECIMAL(8, 2) NOT NULL,
        `date_created` DATETIME,
        `last_login` DATETIME
    );

CREATE TABLE
    `stocks`(
        `stock_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `quantity` INT NOT NULL,
        `value` DECIMAL(8, 2) NOT NULL,
        `ticker` VARCHAR(255) NOT NULL UNIQUE,
        `name` VARCHAR(255) NULL
    );

CREATE TABLE
    `stock_client_ops` (
        `stock_id` INT NOT NULL,
        `client_id` INT NOT NULL,
        `quantity` INT NOT NULL,
        `value` DECIMAL(8, 2) NOT NULL,
        `operation` VARCHAR(255) NOT NULL,
        PRIMARY KEY (`stock_id`, `client_id`)
    );

INSERT INTO
    `clients` (
        `email`,
        `password`,
        `user_name`,
        `account_balance`,
        `date_created`,
        `last_login`
    )
VALUES (
        'paolo@xpinc.com',
        'vouseraprovadonoprocesso',
        'Paolo',
        '100000.00',
        '2022-07-15 00:00:00',
        '2022-07-15 00:00:00'
    ), (
        'luca@gmail.com',
        'vaiserbeneficiado',
        'Luca',
        '100.00',
        '2022-07-15 00:00:00',
        '2022-07-15 00:00:00'
    ), (
        'manu@gmail.com',
        'vaiserbeneficiada',
        'Manu',
        '100.00',
        '2022-07-15 00:00:00',
        '2022-07-15 00:00:00'
    );

INSERT INTO
    `stocks` (
        `ticker`,
        `name`,
        `quantity`,
        `value`
    )
VALUES (
        'CMIG4',
        'CEMIG',
        '100000',
        '10.44'
    ), (
        'PETR4',
        'Petrobras',
        '10000',
        '28.15'
    ), (
        'VALE3',
        'Vale',
        '1000',
        '68.47'
    ), ('ITUB3', 'Itaú', '100', '19.61'), (
        'GGBB4',
        'Gerdau',
        '10',
        '23.50'
    );

INSERT INTO
    `stock_client_ops` (
        `stock_id`,
        `client_id`,
        `quantity`,
        `value`,
        `operation`
    )
VALUES ('1', '1', '100', '10.44', 'buy'), ('2', '1', '100', '28.15', 'buy'), ('3', '1', '100', '68.47', 'buy'), ('4', '1', '100', '19.61', 'buy'), ('5', '1', '100', '23.50', 'buy')