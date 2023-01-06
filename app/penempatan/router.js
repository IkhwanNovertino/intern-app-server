var express = require('express');
var router = express.Router();
const { index, viewCreate, actionCreate, viewDetail, actionDelete } = require('./controller');
const { isLoginAdmmin } = require('../middleware/auth');

router.use(isLoginAdmmin)
router.get('/', index);
router.get('/create', viewCreate);
router.post('/create', actionCreate);
router.get('/detail/:id', viewDetail);
router.delete('/delete/:id', actionDelete);

module.exports = router;