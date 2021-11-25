const express = require('express');

const router = express.Router();

const userControllers = require('./userControllers');

router.post('/users', userControllers.createNewUser);

module.exports = router;