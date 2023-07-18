const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const db = require('../../config/db');

const getUser = (callback) => {
    const sql = 'SELECT * FROM user';
    db.query(sql, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

const getUserById = (id, callback) => {
    const sql = 'SELECT * FROM user WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

const getUserByEmail = (email, callback) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    db.query(sql, [email], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result[0]);
        }
    });
};

const registerUser = async (req, callback) => {
    const sql = 'INSERT INTO user (`email`, `password`, `name`, `firstname`) VALUES (?)';
    const numSalt = await bcrypt.genSalt(10);
    const enc = await bcrypt.hash(req.body.password, 10);
    const info = [
        req.body.email,
        enc,
        req.body.name,
        req.body.firstname
    ]
    db.query(sql, [info], (err, result) => {
        if (err) {
            callback(err, null, enc);
        } else {
            callback(null, result, enc);
        }
    });
};

const updateUserById = async (id, userInfo, callback) => {
    const sql = 'UPDATE user SET `email` = ?, `password` = ?, `firstname` = ?, `name` = ? WHERE id = ?';
    const numSalt = await bcrypt.genSalt(10);
    const info = [
        userInfo.email,
        await bcrypt.hash(userInfo.password, 10),
        userInfo.firstname,
        userInfo.name,
        id
    ];
    db.query(sql, info, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

const deleteUserById = (id, callback) => {
    const sql = 'DELETE FROM user WHERE `id` = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

module.exports = {
    getUser,
    getUserById,
    getUserByEmail,
    registerUser,
    updateUserById,
    deleteUserById,
};
