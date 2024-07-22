const express = require('express');

const router = express.Router();
const { Department } = require('../../../db/models');
const {deserialize, serialize} = require("../../../db/serializers");

// Get all departments
router.get('/', async (req, res) => {
    const departments = await Department.findAll({
        include: ['users']
    });
    res.send(serialize(departments));
});

// Get a department by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const department = await Department.findByPk(id);
    if (department) {
        res.send(serialize(department));
    } else {
        res.status(404).send({ message: 'Department not found' });
    }
});

// Create a new department
router.post('/', async (req, res) => {
    const department = await Department.create(req.body);
    res.send(serialize(department));
});

// Update a department by ID
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const json = req.body;

    const [number, rows] = await Department.update(json, {
        where: { id },
        returning: true,
    });

    if (number > 0) {
        res.send(serialize(rows[0]));
    } else {
        res.status(404).send({ message: 'Department not found' });
    }
});

// Delete a department by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const department = await Department.findByPk(id);
    if (department) {
        await department.destroy();
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'Department not found' });
    }
});

module.exports = router;
