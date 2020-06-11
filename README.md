# FULL STACK TODO

### STACK

- backend:

  - nodejs
  - express
  - postgreSQL
  - knexJs(query-builder/migrations/seeds)
  - bcrypt
  - JWT
  - faker

- frontend:

  - React
  - React router dom
  - Sass

### SERVER INSTALL

Can still be buggy.
empty db ?

- knex migrate:latest
- knex seed:run --specific 01_normal.js

1. install docker
2. cd todo-server
3. make .env file in folder with following values:

- SERVER_PORT=(DEFAULT IS 5000)
- POSTGRES_PASSWORD=(REQUIRED)
- POSTGRES_USER=(REQUIRED)
- POSTGRES_DB=(REQUIRED)
- SECRET_TOKEN=('can be any character')(REQUIRED)

4. RUN: docker-compose up -d (In windows run powershell)

5. check the logs => docker-comose info -f ctf+c to close

### CLIENT INSTALL

1. install node
2. cd todo-client
3. npm install
4. npm start

#### BACKEND TODOS:

- [x] drawing up db: https://app.lucidchart.com/documents/edit/06511eaa-4734-4d5e-894e-dd3410d6e505/0_0?beaconFlowId=8ED0032A0D569856
- [x] setup docker for postgres
- [x] migrating db (knex)
- [x] seeding db with random data -> random data generator
- [x] creating TODO model CRUD operations-> actually queries
- [x] creating TODO controller
- [x] creating TODO routes
- [x] making USER model
- [x] server side auth/validation
- [x] route protection
- [ ] send all correct status codes
- [ ] docker secrets??
- [ ] Crud lists model:
  - [x] add List:
  - [x] add list
  - [x] display color of todos in a list
  - [x] check if already exists
  - [x] update todo when added to list
  - [x] show lists
  - [ ] edit lists:
  - [x] acces todos from whitin list
  - [ ] removing todos from list?
  - [x] delete lists
- JWT token expired -> logout and redirect...
- [ ] Comment model ...
- [ ] ...

#### FRONTEND TODOS:

- [x] create react app
- [x] fetch data from API...to be continued
- [x] login /signup
- [x] basic styling...to be continued
- [x] setup react-router
- [x] setup React context API for global state state hooks for local state
      => memory leak for errors ??
- [x] Login/signup error => don't redirect
- [x] signup correct => redirect to login page
- [x] login correct => redirect to home page
- [ ] client side validation!
- [ ] client side error checking...busy
- [x] remove popups
- [x] client side remove error when confirmed
- [x] fix router (buggy)
- [x] react router protected routes !!!
- [ ] when deleting, first show popup
- [x] set placeholders
- [ ] Pages to default export Components,hooks to regular export
- [ ] fix apiHook, or something... redundant repeating:

#### KNOWN BUGS:

- [x] database syncing when first logged in
