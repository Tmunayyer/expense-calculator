CREATE DATABASE expense_calculator;

CREATE TABLE "user" (
    id serial primary key,
    google_id text UNIQUE,
    full_name varchar(255),
    first_name varchar(255),
    last_name varchar(255),
    avatar text
);

CREATE TABLE "calculator" (
    id serial primary key,
    user_id integer REFERENCES "user"(id) UNIQUE,
    election float default null,
    salary float default null
);