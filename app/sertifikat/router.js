var express = require('express');
var router = express.Router();
const { index, viewRead, viewEdit, viewCreate, actionCreate, viewPrint, actionPrint } = require('./controller');

/* GET home page. */
router.get('/', index);
router.get('/create/:id', viewCreate);
router.post('/create/:id', actionCreate);
router.get('/print/:id', viewPrint);
router.get('/actionPrint/:id', actionPrint);
router.get('/read/:id', viewRead);

module.exports = router;