DROP TABLE "user";
CREATE TABLE "user" (
    id serial primary key,
    full_name varchar(255),
    first_name varchar(255),
    last_name varchar(255)
);