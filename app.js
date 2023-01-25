const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session')
const flash = require('connect-flash');

const userRouter = require('./app/user/router');
const dashboardRouter = require('./app/dashboard/router');
const biroRouter = require('./app/biro/router');
const pembinaRouter = require('./app/pembina/router');
const pembimbingRouter = require('./app/supervisor/router');
const pesertaRouter = require('./app/peserta/router');
const penempatanRouter = require('./app/penempatan/router');
const sertifikatRouter = require('./app/sertifikat/router');
const rekapRouter = require('./app/rekap/router');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//konfig express-session dan flash
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(flash());

app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/adminlte', express.static(path.join(__dirname, '/node_modules/admin-lte')));

app.use('/', userRouter);
app.use('/dashboard', dashboardRouter);
app.use('/biro', biroRouter);
app.use('/pembina', pembinaRouter);
app.use('/pembimbing', pembimbingRouter);
app.use('/peserta', pesertaRouter);
app.use('/penempatan', penempatanRouter);
app.use('/sertifikat', sertifikatRouter);
app.use('/rekap', rekapRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
