const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userQuery = require('../user/user.query.js');
router.use(express.json());
router.use(express.Router());

router.post('/', async (req, res) => {
    userQuery.registerUser(req, (err, result, enc) => {
        if (err) {
            return res.json({ "msg": "Account already exists" });
        }
        return res.json({ "token" : `${enc}` });
    });
});

module.exports = router;

