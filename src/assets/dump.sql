CREATE TABLE IF NOT EXISTS user_registration(
emp_id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT, 
    email TEXT,
    password TEXT,
    mobile_no INTEGER
);


INSERT or IGNORE INTO user_registration(id, full_name, email,password,mobile_no) VALUES (1, 'PSY', 'PSYexo@gmail.com','weareone','1234567890');

