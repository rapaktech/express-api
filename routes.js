const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});

router.use('**', (req, res) => {
    res.status(404).json({ message: 'Route not found.' });
});

module.exports = router;