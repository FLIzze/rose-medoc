CREATE USER 'rose-medoc'@'%' IDENTIFIED BY '1231';
GRANT ALL PRIVILEGES ON calendar.* TO 'rose-medoc'@'%';
FLUSH PRIVILEGES;
