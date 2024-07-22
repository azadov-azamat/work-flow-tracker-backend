const express = require('express');
const router = express.Router();
const { User } = require('../../../db/models');
const { serialize, deserialize } = require('../../../db/serializers');

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: ['media_file']
    });
    res.send(serialize(users));
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const department = await User.findByPk(id);
    if (department) {
        res.send(serialize(department));
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

router.post('/', async (req, res) => {
    const user = await User.create(req.body);
    res.send(serialize(user));
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const json = req.body;
    const [number, rows] = await User.update(json, {
        where: { id },
        returning: true,
    });

    if (number > 0) {
        res.send(serialize(rows[0]));
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        await user.destroy();
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

module.exports = router;
