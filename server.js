var express = require('express');

var app = express.createServer(express.logger());

// Config
app.use(app.router);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Error Handling
app.use(function(req, res, next){
  next(new NotFound(req.url));
});


function NotFound(path){
  this.name = 'NotFound';
  if (path) {
    Error.call(this, 'Cannot find ' + path);
    this.path = path;
  } else {
    Error.call(this, 'Not Found');
  }
  Error.captureStackTrace(this, arguments.callee);
}

NotFound.prototype.__proto__ = Error.prototype;

app.error(function(err, req, res, next){
  if (err instanceof NotFound) {
    res.send("zomg not found");
  } else {
    next(err);
  }
});

app.error(function(err, req, res){
    console.log(err);
    res.send("zomg it broked");
});



app.get('/', function(request, response) {
  response.render('layout');
});


// Error URLs
app.get('/404', function(req, res){
  throw new NotFound(req.url);
});

app.get('/500', function(req, res, next){
  next(new Error('keyboard cat!'));
});



var port = process.env.PORT || 3000;
console.log("Listening on " + port);

app.listen(port);

