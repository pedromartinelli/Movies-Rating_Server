const express = require('express');
const sqliteConnection = require('./database/sqlite/index');

sqliteConnection();

const app = express();
app.use(express.json());


const PORT = 3333;

app.listen(PORT, () => console.log(`This server is running on Port: ${PORT}`))