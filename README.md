# expense-calculator

A SPA using React, Node, Express, and PostgreSQL that includes Google OAuth workflows.

The application: https://ce-expense-calculator.herokuapp.com/

## Description

This is a coding challenge application to demonstrate abilities to develope the front and backend. The stack is React, Redux, Node, Express, and PostgreSQL.

Features:

- Custom Redux interface using higher order reducers to simplify interaction within React code.
- Google API interface to provide OAuth authentication logic and retrieve basic user data.
- PostgreSQL for persistent data as well as express sessions for better user experience.

## Setting Up

Running the application locally or deploying to Heroku requires pre-requisite steps here.

1. Visit Google's [developer console](https://console.developers.google.com/).
2. Register the application with Google and create web application credentions.
   - Visit "Credentials" tab
   - Click "+ Create Credentials"
   - Select "OAuth client ID" in the dropdown
   - Select "Web Application"
   - Input any name of your choosing
   - Input "http://localhost:3000" under "Authorized JavaScript origins"
   - Input "http://localhost:3000/google/redirect" under "Authorized redirect URIs"
   - Copy and save your "Client ID" and "Client Secret" for later

## Installing Locally

### Prerequisites

To run this locally there are two prerequisites: [Node](https://nodejs.org/en/download/) and a local version of [PostgreSQL](https://www.postgresql.org/download/). (This is assuming you already have [Git](https://help.github.com/en/github/getting-started-with-github/set-up-git).)

Once PostgreSQL is installed and running you need to create the database.

1. Enter the shell with the desired username

```
$ psql "username"
```

2. Inside the shell, create the `expense_calculator` database

```
CREATE DATABASE expense_calculator;
```

### Instructions

1. Clone the [repository](https://github.com/Tmunayyer/expense-calculator).
2. Navigate to the root level of the cloned directory and create a file named ".env" and input the required environment variables (anything starting with "YOUR")

```
MODE=development
PORT=3000
SESSION_SECRET=YOUR SESSION SECRET

PGUSER=YOUR PG USER
PGHOST=localhost
PGPASSWORD=YOUR PG PASSWORD
PGDATABASE=expense_calculator
PGPORT=YOUR PG PORT

GOOGLE_CLIENT_ID=YOUR GOOGLE CLIENT ID
GOOGLE_SECRET=YOUR GOOGLE SECRET
GOOGLE_REDIRECT=YOUR GOOGLE REDIRECT

```

3. Run npm install

```
$ npm install
```

4. Run npm start

```
$ npm start
```

5. Navigate to localhost:3000 or your chosen port.

## Deploying to Heroku

1. Sign up for free with [Heroku](https://www.heroku.com/).
2. Install Heroku locally by following these directions [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up).
