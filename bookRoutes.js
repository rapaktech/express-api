const express = require('express');

const router = express.Router();

const bookControllers = require('./bookControllers');

router.post('/books', bookControllers.createNewBook);

module.exports = router;