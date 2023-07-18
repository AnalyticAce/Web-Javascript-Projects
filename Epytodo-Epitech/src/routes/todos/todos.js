const express = require('express');
const router = express();
const check = require('../../middleware/auth.js');
const todoQuery = require('../../routes/todos/todos.query');
router.use(express.json())
const mysql = require('mysql2');
const { route } = require('../user/user.js');
router.use(express.Router());

router.get('/', check.auth, (req, res) => {
    todoQuery.getAllTodos((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error happened while getting todos' });
        }
        return res.json(result);
    });
});

router.get('/:id', check.auth, (req, res) => {
    const id = req.params.id.substring(1);
    todoQuery.getTodoById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!result) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        return res.json(result);
    });
});

router.post('/', check.auth, (req, res) => {
    const todoData = req.body;
    if (!todoData || !todoData.title || !todoData.description) {
        return res.status(400).json({ message: 'Bad parameter' });
    }
    todoQuery.createTodo(todoData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        return res.json({ message: 'Todo created successfully' });
    });
});

router.put('/:id', check.auth, (req, res) => {
    const todoData = req.body;
    const id = req.params.id.substring(1);
    if (!todoData || !todoData.title || !todoData.description) {
        return res.status(400).json({ message: 'Bad parameter' });
    }
    todoQuery.updateTodoById(id, todoData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        return res.json({ message: 'Todo updated successfully' });
    });
});

router.delete('/:id', check.auth, (req, res) => {
    const todoId = req.params.id.substring(1);
    todoQuery.deleteTodoById(todoId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        return res.json({ message: 'Todo deleted successfully' });
    });
});

module.exports = router;

