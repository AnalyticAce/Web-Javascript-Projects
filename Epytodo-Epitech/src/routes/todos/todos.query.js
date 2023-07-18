const db = require('../../config/db');
const mysql = require('mysql2');

const getAllTodos = (callback) => {
    const sql = 'SELECT * FROM todo';
    db.query(sql, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

const getTodoUser = (req, callback) => {
    const sql = 'SELECT * FROM todo WHERE `user_id` = ?'
    const values = req.user.id;
    db.query(sql, [values], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

const getTodoById = (id, callback) => {
    const sql = 'SELECT * FROM todo WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

const createTodo = (todoData, callback) => {
    const sql = 'INSERT INTO todo (`title`, `description`, `due_time`, `status`, `user_id`) VALUES (?)';
    const values = [
        todoData.title,
        todoData.description,
        todoData.due_time,
        todoData.status,
        todoData.user_id
    ];
    db.query(sql, [values], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

const updateTodoById = (id, todoData, callback) => {
    const sql = 'UPDATE todo SET `title` = ?, `description` = ?, `due_time` = ?, `status` = ?, `user_id` = ? WHERE id = ?';
    const values = [
        todoData.title,
        todoData.description,
        todoData.due_time,
        todoData.status,
        todoData.user_id,
        id
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

const deleteTodoById = (id, callback) => {
    const sql = 'DELETE FROM todo WHERE `id` = ?';
    db.query(sql, [id], (err, result) => {
        console.log(id);
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodoById,
    deleteTodoById,
    getTodoUser,
};
