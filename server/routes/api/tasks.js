const express = require('express');
const router = express.Router();
const { Task } = require('../../../db/models');
const { serialize, deserialize} = require('../../../db/serializers');

// Get all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.findAll({
        include: ['user', 'media_file']
    });
    res.send(serialize(tasks));
});

// Create a new task
router.post('/', async (req, res) => {
    const task = await Task.create(req.body);
    res.send(serialize(task));
});

// Update a task by ID
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const json = deserialize(req.body);

    const [number, rows] = await Task.update(json, {
        where: { id },
        returning: true,
    });

    if (number > 0) {
        res.send(serialize(rows[0]));
    } else {
        res.status(404).send({ message: 'Task not found' });
    }
});

// Delete a task by ID
router.delete('/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (task) {
        await task.destroy();
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'Task not found' });
    }
});

module.exports = router;
