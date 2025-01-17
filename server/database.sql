CREATE TABLE users (
  -- Unique complex string generated as key using function
  -- extension download needed - uuid oosp
  user_id uuid PRIMARY KEY DEFAULT 
  uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL
);

