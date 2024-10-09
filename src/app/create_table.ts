import { db_credentials } from "./credentials";
import * as mysql from 'mysql2/promise';

async function createTable() {
    const pool = mysql.createPool({
        host: db_credentials.host,
        user: db_credentials.user,
        password: db_credentials.password,
        database: db_credentials.database,
    });

    const connection = await pool.getConnection();
    try {
        const createDatabaseQuery = `
            CREATE DATABASE IF NOT EXISTS calendar;
        `;

        await connection.query(createDatabaseQuery);
        await connection.changeUser({ database: 'calendar' });

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

