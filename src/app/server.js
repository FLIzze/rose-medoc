"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_credentials_1 = require("./db_credentials");
var express = require('express');
var mysql = require('mysql2');
var cors = require('cors');
var bodyParser = require('body-parser');
var sharp = require('sharp');
var app = express();
var port = 5000;
var pool = mysql.createPool({
    host: db_credentials_1.db_credentials.host,
    user: db_credentials_1.db_credentials.user,
    password: db_credentials_1.db_credentials.password,
    database: db_credentials_1.db_credentials.database
});
var corsOptions = {
    origin: '*', // Permettre à toutes les origines d'accéder à l'API
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
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
app.put('/api/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, email, firstName, lastName, password, color, pp, fileBuffer, base64Data, buffer, sql, values;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, email = _a.email, firstName = _a.firstName, lastName = _a.lastName, password = _a.password, color = _a.color, pp = _a.pp;
                fileBuffer = null;
                if (!(pp && pp !== '')) return [3 /*break*/, 2];
                base64Data = pp.split(',')[1];
                buffer = Buffer.from(base64Data, 'base64');
                return [4 /*yield*/, sharp(buffer)
                        .resize(200, 200)
                        .jpeg({ quality: 80 })
                        .toBuffer()];
            case 1:
                fileBuffer = _b.sent();
                _b.label = 2;
            case 2:
                sql = 'UPDATE user SET email = ?, firstName = ?, lastName = ?, color = ?';
                values = [email, firstName, lastName, color];
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
                return [2 /*return*/];
        }
    });
}); });
app.post('/api/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, uuid, lastName, firstName, email, password, color, pp, fileBuffer, base64Data, buffer, sql, values;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, uuid = _a.uuid, lastName = _a.lastName, firstName = _a.firstName, email = _a.email, password = _a.password, color = _a.color, pp = _a.pp;
                fileBuffer = null;
                if (!pp) return [3 /*break*/, 2];
                base64Data = pp.split(',')[1];
                buffer = Buffer.from(base64Data, 'base64');
                return [4 /*yield*/, sharp(buffer)
                        .resize(200, 200)
                        .jpeg({ quality: 80 })
                        .toBuffer()];
            case 1:
                fileBuffer = _b.sent();
                _b.label = 2;
            case 2:
                sql = 'INSERT INTO user (uuid, lastName, firstName, email, password, color, pp) VALUES (?, ?, ?, ?, ?, ?, ?)';
                values = [uuid, lastName, firstName, email, password, color, fileBuffer];
                pool.query(sql, values, function (error) {
                    if (error) {
                        console.error('Error creating user:', error);
                        return res.status(500).json({ error: error.message });
                    }
                    res.status(201).json({ message: 'User created' });
                });
                return [2 /*return*/];
        }
    });
}); });
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
