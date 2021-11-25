const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;



app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

const routes = require('./routes');
app.use(routes);

app.use('**', (req, res) => {
    res.status(404).send('Route not found.');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}.`);
});