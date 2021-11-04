const express = require('express');
const app = express();
const port = 3000;

let count = 0;

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.get('/ping', (req, res) => {
    count++;
    if (count == 1) {
        res.status(200).send(`There has been 1 ping since the server started.`);
    } else if (count > 1) {
        res.status(200).send(`There has been ${count} pings since the server started.`);
    }
});

app.get('/books', (req, res) => {
    res.status(200).send('Hello World!');
});

app.use('**', (req, res) => {
    res.status(404).send('Route not found.');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}.`);
});