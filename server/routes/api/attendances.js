const express = require('express');
const router = express.Router();
const { Attendance } = require('../../../db/models');
const { serialize, deserialize} = require('../../../db/serializers');

// Get all attendances
router.get('/', async (req, res) => {
    const attendances = await Attendance.findAll({
        include: ['user']
    });
    res.send(serialize(attendances));
});

// Create a new attendance
router.post('/', async (req, res) => {
    const attendance = await Attendance.create(req.body);
    res.send(serialize(attendance));
});

// Update an attendance by ID
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const json = deserialize(req.body);

    const [number, rows] = await Attendance.update(json, {
        where: { id },
        returning: true,
    });

    if (number > 0) {
        res.send(serialize(rows[0]));
    } else {
        res.status(404).send({ message: 'Attendance not found' });
    }
});

// Delete an attendance by ID
router.delete('/:id', async (req, res) => {
    const attendance = await Attendance.findByPk(req.params.id);
    if (attendance) {
        await attendance.destroy();
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'Attendance not found' });
    }
});

module.exports = router;
