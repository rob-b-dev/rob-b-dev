CREATE DATABASE webapp

CREATE TABLE students (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  roles TEXT[] NOT NULL DEFAULT ARRAY['student'] 
);

CREATE TABLE tutors (
    user_id UUID PRIMARY KEY REFERENCES students(user_id) ON DELETE CASCADE,
    user_email VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL, 
    subjects TEXT[] NOT NULL, 
    experience_years INT NOT NULL CHECK (experience_years >= 0),
    availability TEXT[] NOT NULL ,
    hourly_rate NUMERIC(10,2) NOT NULL CHECK (hourly_rate >= 0)
);

CREATE TABLE user_issues (
   user_id UUID REFERENCES students(user_id) ON DELETE CASCADE,
   issue_id UUID DEFAULT uuid_generate_v4(),
   issue_details TEXT NOT NULL,
   issue_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (user_id, issue_id)
);


-- Note:
-- To access DB, run in terminal:
--- 1) brew services start postgresql
--- 2) psql -U admin webapp;

--- methods to view pg table online
--- standard sql to display users - select * from users;