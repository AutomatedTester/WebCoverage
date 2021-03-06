var express = require('express');

var app = module.exports = express.createServer(express.logger());

// Config
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

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
    res.render('404');
  } else {
    next(err);
  }
});

app.error(function(err, req, res){
    console.log(err);
    res.render("500");
});

app.get('/', function(request, response) {
  response.render('main');
});



// Error URLs
app.get('/404', function(req, res){
  throw new NotFound(req.url);
});

app.get('/500', function(req, res, next){
  next(new Error('keyboard cat!'));
});

require('./routes/posts')(app);

var port = process.env.PORT || 3000;
console.log("Listening on " + port);

app.listen(port);

