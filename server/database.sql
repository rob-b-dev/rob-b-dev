CREATE DATABASE webapp
CREATE TABLE users (
  -- Unique complex string generated as key using function
  -- extension download needed - uuid oosp
  user_id uuid PRIMARY KEY DEFAULT 
  uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL
);

-- Note:
-- To access DB, run in terminal:
--- 1) brew services start postgresql
--- 2) psql -U admin -d webapp;

--- methods to view pg table online
--- standard sql to display users - select * from users;