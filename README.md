# todo

Todo Node,Express,Knexjs,React

To run locally:

## SERVER

- cd todo-server
- make .env file in folder with following values:

  - SERVER_PORT=(DEFAULT IS 5000)
  - POSTGRES_PASSWORD=(REQUIRED)
  - POSTGRES_USER=(REQUIRED)
  - POSTGRES_DB=(REQUIRED)
  - SECRET_TOKEN=('can be any character')(REQUIRED)

- RUN: docker-compose up -d

(check the logs => docker-comose info -f ctf+c to close)

#CLIENT
-cd todo-client

- npm install
- npm start

#BACKEND:

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
- [ ] docker secrets
- [ ] Creating List model ...working on it
- [ ] Comment model ...
- [ ] ...

#FRONTEND

- [x] create react app
- [x] fetch data from API...to be continued
      => useApi hook not working !? repeating too much
- [x] login /signup
- [x] basic styling...to be continued
- [x] setup react-router
- [x] setup React context API for global state state hooks for local state
      => memory leak for errors ??
- [ ] client side validation!
- [ ] client side error checking
- [ ] fix router (buggy)
- [ ] fix apiHook, or something... redundant repeating
- [ ] .....
