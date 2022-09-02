const express = require('express');
const migrationsRun = require('./database/sqlite/migrations');

migrationsRun();

const app = express();
app.use(express.json());


const PORT = 3333;

app.listen(PORT, () => console.log(`This server is running on Port: ${PORT}`))