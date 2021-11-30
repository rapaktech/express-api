const express = require('express');

const router = express.Router();

const userControllers = require('./userControllers');

router.post('/users', userControllers.createNewUser);

router.get('/users/', userControllers.getAllUsers);

router.get('/users/:userId', userControllers.getOneUser);

router.put('/users', userControllers.updateOneUser);

router.delete('/users', userControllers.deleteOneUser);

module.exports = router;