CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_fname VARCHAR(255) NOT NULL,
  user_lname VARCHAR(255) NOT NULL,
  user_phone VARCHAR(18) NOT NULL
  user_email VARCHAR(255) UNIQUE NOT NULL,
  user_password VARCHAR(255) NOT NULL,
);

CREATE TABLE booking_details (
    booking_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    booking_type VARCHAR(16),
    product_type VARCHAR(24),
    booking_time VARCHAR(12),
    booking_date VARCHAR(16),
    booking_location VARCHAR(12)
    PRIMARY KEY (booking_id, user_id)
);

CREATE TABLE user_address (
    user_id UUID NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    address_line VARCHAR(33),
);