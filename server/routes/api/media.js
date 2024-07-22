const express = require('express');
const router = express.Router();
const { Media } = require('../../../db/models');
const {serialize, deserialize} = require("../../../db/serializers");

// Get all media files
router.get('/', async (req, res) => {
    const mediaFiles = await Media.findAll({
        include: ['user', 'task']
    });
    res.send(serialize(mediaFiles));
});

// Create a new media file
router.post('/', async (req, res) => {
    const mediaFile = await Media.create(req.body);
    res.send(serialize(mediaFile));
});

// Update a media file by ID
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const json = deserialize(req.body);

    const [number, rows] = await Media.update(json, {
        where: { id },
        returning: true,
    });

    if (number > 0) {
        res.send(serialize(rows[0]));
    } else {
        res.status(404).send({ message: 'Media file not found' });
    }
});

// Delete a media file by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const mediaFile = await Media.findByPk(id);
    if (mediaFile) {
        await mediaFile.destroy();
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'Media file not found' });
    }
});

module.exports = router;
