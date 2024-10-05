async function createTable() {
    const mysql = require('mysql2');

    const pool = mysql.createPool({
        host: 'random',
        user: 'rose-medoc',
        password: '1231',
        database: 'calendar'
      });

    const connection = await pool.getConnection();
    try {
        const createDataseQuery = `
        CREATE DATABASE IF NOT EXISTS calendar;
        `

        const createUserTableQuery = `
        CREATE TABLE IF NOT EXISTS user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        uuid VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        firstName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        color VARCHAR(255) NOT NULL,
        pp BLOB
      );
        `;

        const createEventTableQuery = `
        CREATE TABLE IF NOT EXISTS event (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        beginning DATETIME NOT NULL,
        end DATETIME NOT NULL,
        \`by\` INT NOT NULL,
        location VARCHAR(255),
        participants JSON
      );
        `;

        await connection.query(createDataseQuery);
        await connection.query(createUserTableQuery);
        await connection.query(createEventTableQuery);
    } catch (error) {
        console.error('Error creating tables', error);
    } finally {
        console.log("Tables created successfully");
        connection.release();
    }
}

createTable();
