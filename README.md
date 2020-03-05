# expense-calculator

A SPA using React, Node, Express, and PostgreSQL that includes Google OAuth workflows.

The application: https://ce-expense-calculator.herokuapp.com/

## Description

This is a coding challenge application to demonstrate abilities to develope the front and backend. The stack is React, Redux, Node, Express, and PostgreSQL.

Features:

- Custom Redux interface using higher order reducers to simplify interaction within React code.
- Google API interface to provide OAuth authentication logic and retrieve basic user data.
- PostgreSQL for persistent data as well as express sessions for better user experience.

Please see sections Notes and Next Steps sections below for more commentary.

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
3. Create the Heroku app and register it by running:

```
heroku create
```

4. Navigate to the Heroku console and find the application. Retrieve the public URI that you are able to access the application from under the setting tab. Scroll down to the domains sections and retrieve the URI.

5. Register the Heroku domain with [Google](https://console.developers.google.com/).

   - Navigate to "Credentials"
   - Select the application
   - Click "+ Add URI" under "Authorized JavaScript origins"
   - Copy and paste Heroku URI
   - Click "+ Add URI" under "Authorized redirect URIs"
   - Copy, paste, and add "/google/redirect" to the end if the URI

6. Set up Heroku environment variables. NOTE: Heroku will automatically pass a database connection url to the application.

```
MODE=development
SESSION_SECRET=YOUR SESSION SECRET

GOOGLE_CLIENT_ID=YOUR GOOGLE CLIENT ID
GOOGLE_SECRET=YOUR GOOGLE SECRET
GOOGLE_REDIRECT=YOUR GOOGLE REDIRECT
```

7. Spin up a free Heroku PostgreSQL instance by navigating to the resource tab and searching PostgreSQL. Select "Heroku PostgreSQL"

8. Deploy the application

```
$ git push heroku master
```

## Notes

While building this application I experimented with implementing a Redux interface I have used before. It makes things quite convenient when adding components and managing many different branches of state. The implementation was new to me and could possibly be refined to be clearer or more performant. Setting this up took the most time out of all other features but made state managment and Redux very easy to use.

I also tried a new interface for the routes to make RESTful practices more straight forward. In the end I am undecided on the approach as in its current state it feels light weight but as the application grows it would likely become more combersome and resource heavy.

Because I experimented a little bit with these interfaces, the styling and css approach to the application is left wanting.

## Next Steps

There is some key functionality missing due to time constraints. Here they are in order of priority to resolve.

1. The user needs to be able to log out.
2. An interface for API calls from the frontend needs to be more robust and standard. For the small amount we have, there is already enough variance to warrant some abstraction. This could include the introduction of Saga or Thunk as Redux middleware or just a small library to standardize the calls.
3. There is currently no approach to styling. Everything is dumped into main.css. I would explore having styling sheets for each "page" of the application or implement the styled-components library.
4. Although this is a single page application we already have a few different "pages". It would be ideal to implement React Router so we can have some persistence on refresh and the ability to use browser navigation. It would also cleanup the main App component.
