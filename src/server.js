const express = require('express');
const migrationsRun = require('./database/sqlite/migrations');
const routes = require('./routes');

migrationsRun();

const app = express();
app.use(express.json());

app.use(routes);


const PORT = 3333;

app.listen(PORT, () => console.log(`This server is running on Port: ${PORT}`))