const jwt = require('jsonwebtoken');
const { WEEK } = require('time-constants');

function getAuthToken(userId) {
    const expiresIn = WEEK;

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn,
    });

    return { token, userId, expires: new Date(Date.now() + expiresIn) };
}

async function verifyToken(req) {
    const token = req.headers.authorization || req.query.auth;
    if (!token) {
        return null;
    }
    try {
        let payload = await jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        if (payload.expires < Date.now()) {
            return null;
        }
        return payload;
    } catch (e) {
        return null;
    }
}

module.exports = {
    getAuthToken,
    verifyToken,
};
