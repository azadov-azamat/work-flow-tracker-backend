const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/media', require('./media'));
router.use('/departments', require('./departments'));
router.use('/attendances', require('./attendances'));
router.use('/tasks', require('./tasks'));

module.exports = router;
