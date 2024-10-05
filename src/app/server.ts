const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const sharp = require('sharp');

const app = express();
const port = 5000;

const pool = mysql.createPool({
  host: '1234',
  user: 'rose-medoc',
  password: '1231',
  database: 'calendar'
});

const corsOptions = {
  origin: '*',  // Permettre à toutes les origines d'accéder à l'API
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.post('/api/events', (req: any, res: any) => {
  const { title, description, beginning, end, by, participants, location } = req.body;

  const beginningDate = new Date(beginning).toISOString().slice(0, 19).replace('T', ' ');
  const endDate = new Date(end).toISOString().slice(0, 19).replace('T', ' ');

  const sql = 'INSERT INTO event (title, description, beginning, end, `by`, location, participants) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [title, description, beginningDate, endDate, by, location, JSON.stringify(participants)];

  pool.query(sql, values, (error: any) => {
    if (error) {
      console.error('Error creating event:', error);
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ message: 'Event created' });
  });
});

app.put('/api/users', async (req: any, res: any) => {
  const { id, email, firstName, lastName, password, color, pp } = req.body;

  let fileBuffer = null;
  if (pp && pp !== '') {
    const base64Data = pp.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    fileBuffer = await sharp(buffer)
      .resize(200, 200)
      .jpeg({ quality: 80 })
      .toBuffer();
  }

  let sql = 'UPDATE user SET email = ?, firstName = ?, lastName = ?, color = ?';
  const values = [email, firstName, lastName, color];

  if (fileBuffer) {
    sql += ', pp = ?';
    values.push(fileBuffer);
  }

  if (password) {
    sql += ', password = ?';
    values.push(password);
  }

  sql += ' WHERE id = ?';
  values.push(id);

  pool.query(sql, values, (error: any, results: any) => {
    if (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: error.message });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  });
});

app.post('/api/users', async (req: any, res: any) => {
  const { uuid, lastName, firstName, email, password, color, pp } = req.body;

  let fileBuffer = null;
  if (pp) {
    const base64Data = pp.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    fileBuffer = await sharp(buffer)
      .resize(200, 200) 
      .jpeg({ quality: 80 }) 
      .toBuffer();
  }

  const sql = 'INSERT INTO user (uuid, lastName, firstName, email, password, color, pp) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [uuid, lastName, firstName, email, password, color, fileBuffer];

  pool.query(sql, values, (error: any) => {
    if (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ message: 'User created' });
  });
});

app.get('/api/events', (_: any, res: any) => {
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

app.get('/api/users', (_: any, res: any) => {
  pool.query('SELECT * FROM user', (error: any, results: any) => {
    if (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: error.message });
    }

    const users = results.map((user: any) => {
      if (user.pp) {
        user.pp = Buffer.from(user.pp).toString('base64');
      }
      return user;
    });

    res.status(200).json(users);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});