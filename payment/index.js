const express = require("express");
const bodyParser = require("body-parser");
const routes = require('./routes');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

routes.init(app);

// handle error
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Request Not Found');
  err.status = 404;
  next(err);
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

app.listen(port, function(){
  console.log("Server listening on port " + port);
});
