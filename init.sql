CREATE DATABASE trucki;

\c trucki

CREATE TABLE farming(
    id SERIAL PRIMARY KEY,
    telegram_id bigint,
    date_start date,
    duration date,
    completed boolean,
    award bigint NOT NULL DEFAULT 120
);

CREATE TABLE quests(
    id SERIAL PRIMARY KEY,
    telegram_id bigint,
    telegram_id_public bigint,
    telegram_id_link text,
    completed boolean NOT NULL DEFAULT false,
    award bigint NOT NULL DEFAULT 120
);

CREATE TABLE refs(
    id SERIAL PRIMARY KEY,
    telegram_name text,
    telegram_id_inviter bigint,
    telegram_id_invited bigint
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    telegram_name text,
    telegram_id bigint,
    ttc_coin bigint NOT NULL DEFAULT 0
);


INSERT INTO users (telegram_name, telegram_id, ttc_coin) VALUES ('misha', 0, 0);
INSERT INTO users (telegram_name, telegram_id, ttc_coin) VALUES ('sasha', 1, 0);
INSERT INTO users (telegram_name, telegram_id, ttc_coin) VALUES ('vanya', 2, 0);
INSERT INTO users (telegram_name, telegram_id, ttc_coin) VALUES ('kirya', 3, 0);
INSERT INTO users (telegram_name, telegram_id, ttc_coin) VALUES ('dima', 4, 0);
INSERT INTO users (telegram_name, telegram_id, ttc_coin) VALUES ('vlad', 5, 0);


INSERT INTO refs (telegram_name, telegram_id_inviter, telegram_id_invited) VALUES ('misha', 99281932, 0);
INSERT INTO refs (telegram_name, telegram_id_inviter, telegram_id_invited) VALUES ('sasha', 99281932, 1);
INSERT INTO refs (telegram_name, telegram_id_inviter, telegram_id_invited) VALUES ('vanya', 99281932, 2);
INSERT INTO refs (telegram_name, telegram_id_inviter, telegram_id_invited) VALUES ('kirya', 99281932, 3);
INSERT INTO refs (telegram_name, telegram_id_inviter, telegram_id_invited) VALUES ('dima', 99281932, 4);
INSERT INTO refs (telegram_name, telegram_id_inviter, telegram_id_invited) VALUES ('vlad', 99281932, 5);