CREATE DATABASE pern_stack;
CREATE TABLE todo (
  todo_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  list VARCHAR(100),
  description VARCHAR(255),
  date DATE,
  urgency VARCHAR(40) NOT NULL
);