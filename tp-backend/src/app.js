var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require('express-session');
var cookieParser = require('cookie-parser');
var router = require("./routes/users")
var indexRouter = require('./routes/index');
const bodyParser = require('body-parser');
var app = express();

//server
app.set("port", process.env.PORT || 3010);
app.listen(app.get("port"), () => console.log("Server Start http://localhost:" + app.get("port")));

//url encoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// express session
app.use(session({ 
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser());

// Middlewares
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
app.use(userLoggedMiddleware);

//routes
app.use("/api", router)
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
