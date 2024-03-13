const express = require('express');
const { default: tasks } = require('../data');
const router = express.Router();

const TasksArray = tasks;

router.get('/', (req, res) => {
    res.json(TasksArray);
}
);

router.get('/:id', (req, res) => {
    const found = TasksArray.some(task => task.id === parseInt(req.params.id));
    if (found) {
        res.json(TasksArray.filter(task => task.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No task with the id of ${req.params.id}` });
    }
}
);

router.post('/', (req, res) => {
    const newTask = {
        id: TasksArray.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
        dueDate: req.body.dueDate,
        priority: req.body.priority
    };
    if (!newTask.title || !newTask.description || !newTask.dueDate || !newTask.priority) {
        return res.status(400).json({ msg: 'Please include a title, description, due date and priority' });
    }
    TasksArray.push(newTask);
    res.json(TasksArray);
}
);

router.put('/priority/:id', (req, res) => {
    const found = TasksArray.some(task => task.id === parseInt(req.params.id));
    if (found) {
        const updTask = req.body;
        TasksArray.forEach(task => {
            if (task.id === parseInt(req.params.id)) {
                task.priority = updTask.priority ? updTask.priority : task.priority;

                res.json({ msg: 'Task updated', task });
            }
        });
    } else {
        res.status(400).json({ msg: `No task with the id of ${req.params.id}` });
    }
}   
);

router.put('/completed/:id', (req, res) => {
    const found = TasksArray.some(task => task.id === parseInt(req.params.id));
    if (found) {
        const updTask = req.body;
        TasksArray.forEach(task => {
            if (task.id === parseInt(req.params.id)) {
                task.completed = updTask.completed ? updTask.completed : task.completed;

                res.json({ msg: 'Task updated', task });
            }
        });
    } else {
        res.status(400).json({ msg: `No task with the id of ${req.params.id}` });
    }
}
);

router.delete('/:id', (req, res) => {
    const found = TasksArray.some(task => task.id === parseInt(req.params.id));
    if (found) {
        res.json({ msg: 'Task deleted', tasks: TasksArray.filter(task => task.id !== parseInt(req.params.id)) });
    } else {
        res.status(400).json({ msg: `No task with the id of ${req.params.id}` });
    }
}
);

module.exports = router;