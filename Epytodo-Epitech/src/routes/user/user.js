const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userQuery = require('./user.query.js');
const mysql = require('mysql2');
const todoQuery = require('../todos/todos.query.js');
const jwt = require('jsonwebtoken');
const check = require('../../middleware/auth.js');

router.use(express.json());
router.use(express.Router());

router.get('/', check.auth, (req, res) => {
    userQuery.getUser((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error happened while getting users' });
        }
        return res.json(result);
    });
});

router.get('/todos', check.auth, (req, res) => {
    todoQuery.getTodoUser(req, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error happened while getting todos' });
        }
        return res.json(result);
    });
});

router.get('/:id', check.auth, (req, res) => {
    const id = req.params.id.substring(1);
    userQuery.getUserById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(result);
    });
});

router.get('/:email', check.auth, (req, res) => {
    const email = req.params.email.substring(1);
    userQuery.getUserByEmail(email, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(result);
    });
});

router.put('/:id', check.auth, (req, res) => {
    const id = req.params.id.substring(1);
    const userInfo = {
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        name: req.body.name
    };
    userQuery.updateUserById(id, userInfo, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        return res.json(result);
    });
});

router.delete('/:id', check.auth, (req, res) => {
    const id = req.params.id.substring(1);
    userQuery.deleteUserById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(result);
    });
});

module.exports = router;
