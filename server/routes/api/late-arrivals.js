const express = require('express');
const router = express.Router();
const { LateArrivals } = require('../../../db/models');
const { serialize, deserialize } = require('../../../db/serializers');

router.get('/', async (req, res) => {
    const lateArrivals = await LateArrivals.findAll({
        include: ['user']
    });
    res.send(serialize(lateArrivals));
});

// Get a late arrivals by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const department = await LateArrivals.findByPk(id);
    if (department) {
        res.send(serialize(department));
    } else {
        res.status(404).send({ message: 'LateArrivals not found' });
    }
});

router.post('/', async (req, res) => {
    const lateArrival = await LateArrivals.create(req.body);
    res.send(serialize(lateArrival));
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const json = req.body;
    const [number, rows] = await LateArrivals.update(json, {
        where: { id },
        returning: true,
    });

    if (number > 0) {
        res.send(serialize(rows[0]));
    } else {
        res.status(404).send({ message: 'LateArrivals not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const lateArrival = await LateArrivals.findByPk(req.params.id);
    if (lateArrival) {
        await LateArrivals.destroy();
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'LateArrivals not found' });
    }
});

module.exports = router;
