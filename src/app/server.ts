const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'rose-medoc',
    password: '1231',
    database: 'calendar'
});

app.use(cors());
app.use(bodyParser.json());

app.post('/api/events', (req: any, res: any) => {
    const { beginning, end } = req.body;
  
    const beginningDate = new Date(beginning).toISOString().slice(0, 19).replace('T', ' ');
    const endDate = new Date(end).toISOString().slice(0, 19).replace('T', ' ');
  
    const sql = 'INSERT INTO event (beginning, end, title, description, `by`, `where`, theme) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [beginningDate, endDate, 'Event Title', 'Event Description', 'Organizer Name', 'Event Location', 'Event Theme'];
  
    pool.query(sql, values, (error: any, results: any) => {
      if (error) {
        console.error('Error creating event:', error);
        return res.status(500).json({ error: error.message });
      }
      res.status(201).json({ message: 'Event created' });
    });
  });

app.get('/api/events', (req: any, res: any) => {
    pool.query('SELECT * FROM event ORDER BY beginning ASC', (error: any, results: any) => {
        if (error) {
            console.error('Error fetching events:', error);
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
