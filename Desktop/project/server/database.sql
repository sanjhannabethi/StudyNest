-- users table 
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,  -- Added username column
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_type VARCHAR(255) NOT NULL DEFAULT 'Mentee',
  created_at DATE DEFAULT current_date
);

CREATE TABLE IF NOT EXISTS groups (
    group_id SERIAL PRIMARY KEY,
    mentor_id INT REFERENCES users(user_id),
    group_name VARCHAR(255), -- Adding field for group name
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS group_members (
    group_id INT REFERENCES groups(group_id),
    mentee_id INT REFERENCES users(user_id),
    PRIMARY KEY (group_id, mentee_id)
);