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
    var _a = req.body, title = _a.title, description = _a.description, beginning = _a.beginning, end = _a.end;
    var beginningDate = new Date(beginning).toISOString().slice(0, 19).replace('T', ' ');
    var endDate = new Date(end).toISOString().slice(0, 19).replace('T', ' ');
    var sql = 'INSERT INTO event (beginning, end, title, description, `by`, `where`, theme) VALUES (?, ?, ?, ?, ?, ?, ?)';
    var values = [beginningDate, endDate, title, description, 'Organizer Name', 'Event Location', 'Event Theme'];
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
app.listen(port, function () {
    console.log("Server running at http://localhost:".concat(port));
});