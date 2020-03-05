CREATE TABLE IF NOT EXISTS "user" (
    id serial primary key,
    google_id text UNIQUE,
    full_name varchar(255),
    first_name varchar(255),
    last_name varchar(255),
    avatar text
);

CREATE TABLE IF NOT EXISTS "calculator" (
    id serial primary key,
    user_id integer REFERENCES "user"(id) UNIQUE,
    election float default null,
    salary float default null
);

CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL,
    CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE
)
WITH (OIDS=FALSE);

CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
