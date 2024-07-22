const express = require('express');
const { User } = require('../../../db/models');
const route = require('express-async-handler');

const { getAuthToken } = require('../../utils/auth');
const router = express.Router();

router.post(
  '/logout',
  route(async function (req, res) {
    req.logout();
  })
);

router.post(
  '/login',
  route(async function (req, res) {
    let { phone, password } = req.body;
    phone = phone + '';

    let user = await User.findOne({
      where: { phone, isDeactivated: false },
      attributes: ['salt', 'hash', 'id'],
    });

    let isPasswordCorrect = await user?.matchPassword(password);

    if (!user) return res.status(400).send({ message: 'User not found' });

    if (!isPasswordCorrect) return res.status(400).send({ message: 'Password incorrect' });

    res.send(getAuthToken(user.id));
  })
);

module.exports = router;
