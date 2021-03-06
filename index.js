const express = require('express');
const app = express();

app.use(express.json());

require('dotenv').config();
const port = process.env.PORT;

const connectToDB = require('./db');
connectToDB().catch(err => console.log(err)).then(console.log('Database connection successful!'));

const bookRoutes = require('./bookRoutes');
app.use(bookRoutes);

const userRoutes = require('./userRoutes');
app.use(userRoutes);

const routes = require('./routes');
app.use(routes);

app.listen(port, () => {
  console.log(`Server is live!`);
});