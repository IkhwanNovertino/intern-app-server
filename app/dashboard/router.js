const express = require('express');
const router = express.Router();
const { index } = require('./controller');
const { isLoginAdmmin } = require('../middleware/auth');

router.use(isLoginAdmmin)
router.get('/', index);

module.exports = router;