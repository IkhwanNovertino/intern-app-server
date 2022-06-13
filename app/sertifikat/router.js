var express = require('express');
var router = express.Router();
const { index, viewRead, viewEdit, viewCreate, actionCreate, viewPrint, actionPrint } = require('./controller');
const { isLoginAdmmin } = require('../middleware/auth');

router.use(isLoginAdmmin)
router.get('/', index);
router.get('/create/:id', viewCreate);
router.post('/create/:id', actionCreate);
router.get('/print/:id', viewPrint);
router.get('/actionPrint/:id', actionPrint);
router.get('/read/:id', viewRead);

module.exports = router;