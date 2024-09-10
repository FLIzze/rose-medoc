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
    const { title, description, beginning, end, by, participants, location } = req.body;
  
    const beginningDate = new Date(beginning).toISOString().slice(0, 19).replace('T', ' ');
    const endDate = new Date(end).toISOString().slice(0, 19).replace('T', ' ');
  
    const sql = 'INSERT INTO event (title, description, beginning, end, `by`, location, participants) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [title, description, beginningDate, endDate, by, location, JSON.stringify(participants)];
  
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

app.delete('/api/events', (req: any, res: any) => {
  const { id } = req.body;

  const sql = 'DELETE FROM event WHERE ID = ?';

  pool.query(sql, id, (error: any, results: any) => {
    if (error) {
      console.error('Error deleting event:', error);
      return res.status(500).send('Internal Server Error');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('Event not found');
    }

    res.status(200).send('Event deleted successfully');
  });
});

app.get('/api/users', (req: any, res: any) => {
    pool.query('SELECT * FROM user', (error: any, results: any) => {
        if (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
