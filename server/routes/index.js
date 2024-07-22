const express = require('express');
const router = express.Router();
const auth = require('../middleware/jwt-auth');
const { v4: uuidv4 } = require('uuid');
const { serialize } = require('cookie');
const { WEEK } = require('time-constants');


router.use(auth);
router.use(function (req, res, next) {
    req.locale = req.headers['user-locale'] || 'ru';

    let id = req.cookies['session-id'] || uuidv4();
    res.cookie('session-id', id, {
        maxAge: WEEK,
        httpOnly: true, // The cookie is accessible only by the web server
        secure: true, // The cookie will be sent only over HTTPS
        sameSite: 'lax', // Cross-site cookie control (lax, strict, none)
    });

    req.sessionId = id

    next();
});
router.use('/api', require('./api'));

module.exports = router;
