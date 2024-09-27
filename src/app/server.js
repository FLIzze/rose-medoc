var express = require('express');
var mysql = require('mysql2');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var port = 5000;
var pool = mysql.createPool({
    host: 'localhost',
    user: 'rose-medoc',
    password: '1231',
    database: 'calendar'
});
app.use(cors());
app.use(bodyParser.json());
app.post('/api/events', function (req, res) {
    var _a = req.body, title = _a.title, description = _a.description, beginning = _a.beginning, end = _a.end, by = _a.by, participants = _a.participants, location = _a.location;
    var beginningDate = new Date(beginning).toISOString().slice(0, 19).replace('T', ' ');
    var endDate = new Date(end).toISOString().slice(0, 19).replace('T', ' ');
    var sql = 'INSERT INTO event (title, description, beginning, end, `by`, location, participants) VALUES (?, ?, ?, ?, ?, ?, ?)';
    var values = [title, description, beginningDate, endDate, by, location, JSON.stringify(participants)];
    pool.query(sql, values, function (error) {
        if (error) {
            console.error('Error creating event:', error);
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ message: 'Event created' });
    });
});
app.put('/api/users', function (req, res) {
    var _a = req.body, id = _a.id, email = _a.email, firstName = _a.firstName, lastName = _a.lastName, password = _a.password, color = _a.color;
    var sql = 'UPDATE user SET email = ?, firstName = ?, lastName = ?, color = ?';
    var values = [email, firstName, lastName, color];
    if (password) {
        sql += ', password = ?';
        values.push(password);
    }
    sql += ' WHERE id = ?';
    values.push(id);
    pool.query(sql, values, function (error, results) {
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
app.post('/api/users', function (req, res) {
    var _a = req.body, uuid = _a.uuid, lastName = _a.lastName, firstName = _a.firstName, email = _a.email, password = _a.password, color = _a.color, pp = _a.pp;
    var fileBuffer = pp ? Buffer.from(pp.split(',')[1], 'base64') : null;
    var sql = 'INSERT INTO user (uuid, lastName, firstName, email, password, color, pp) VALUES (?, ?, ?, ?, ?, ?, ?)';
    var values = [uuid, lastName, firstName, email, password, color, fileBuffer];
    pool.query(sql, values, function (error) {
        if (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ message: 'User created' });
    });
});
app.get('/api/events', function (_, res) {
    pool.query('SELECT * FROM event ORDER BY beginning ASC', function (error, results) {
        if (error) {
            console.error('Error fetching events:', error);
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json(results);
    });
});
app.delete('/api/events', function (req, res) {
    var id = req.body.id;
    var sql = 'DELETE FROM event WHERE ID = ?';
    pool.query(sql, id, function (error, results) {
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
app.get('/api/users', function (_, res) {
    pool.query('SELECT * FROM user', function (error, results) {
        if (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ error: error.message });
        }
        var users = results.map(function (user) {
            if (user.pp) {
                user.pp = Buffer.from(user.pp).toString('base64');
            }
            return user;
        });
        res.status(200).json(users);
    });
});
app.listen(port, function () {
    console.log("Server running at http://localhost:".concat(port));
});
