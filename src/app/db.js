"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promise_1 = require("mysql2/promise");
var pool = (0, promise_1.createPool)({
    host: 'rose-medoc',
    user: 'root',
    password: '1231',
    database: 'calendar'
});
exports.default = pool;
