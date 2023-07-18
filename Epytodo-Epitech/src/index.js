const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const userQuery = require('../src/routes/user/user.query.js');
const userRoutes = require('../src/routes/user/user.js');
const notFound = require('./middleware/notFound.js');
const register = require('./routes/auth/auth.js');
const todosRoutes = require('../src/routes/todos/todos.js');

app.use(express.json());
app.use('/user', userRoutes);
app.use('/register', userRoutes);
app.use('/register', register);
app.use('/todos', todosRoutes);

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    userQuery.getUserByEmail(email, async (err, user) => {
        if (err) {
            return res.json('Error happened');
        }
        if (!user) {
            return res.json('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json('Invalid credentials');
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRET,
            { expiresIn: '15min' }
        );
        return res.json({ token });
    });
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Connected on port ${port}`);
});
