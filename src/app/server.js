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
    var _a = req.body, title = _a.title, description = _a.description, beginning = _a.beginning, end = _a.end, by = _a.by;
    var beginningDate = new Date(beginning).toISOString().slice(0, 19).replace('T', ' ');
    var endDate = new Date(end).toISOString().slice(0, 19).replace('T', ' ');
    var sql = 'INSERT INTO event (title, description, beginning, end, `by`, `where`) VALUES (?, ?, ?, ?, ?, ?)';
    var values = [title, description, beginningDate, endDate, by, 'Event Location'];
    pool.query(sql, values, function (error, results) {
        if (error) {
            console.error('Error creating event:', error);
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ message: 'Event created' });
    });
});
app.get('/api/events', function (req, res) {
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
app.get('/api/users', function (req, res) {
    pool.query('SELECT * FROM user', function (error, results) {
        if (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json(results);
    });
});
app.listen(port, function () {
    console.log("Server running at http://localhost:".concat(port));
});
