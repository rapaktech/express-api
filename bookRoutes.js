const express = require('express');

const router = express.Router();

const bookControllers = require('./bookControllers');

router.post('/books', bookControllers.createNewBook);

router.get('/books', bookControllers.getAllBooks);

router.get('/books/:bookId', bookControllers.getOneBook);

router.put('/books', bookControllers.updateOneBook);

router.delete('/books', bookControllers.deleteOneBook);

router.get('/books/:username', bookControllers.getBooks);

router.get('/borrow', bookControllers.borrowBook);

router.get('/:username', bookControllers.getUserBooks);

router.put('/return', bookControllers.returnBook);

module.exports = router;