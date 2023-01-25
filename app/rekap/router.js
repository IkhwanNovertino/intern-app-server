const express = require('express');
const router = express.Router();
const { index, viewRekap, actionPrint } = require('./controller');
const { isLoginAdmmin } = require('../middleware/auth');

router.use(isLoginAdmmin)
router.get('/', index);
router.get('/create', viewRekap);
router.get('/actionPrint', actionPrint);

module.exports = router;