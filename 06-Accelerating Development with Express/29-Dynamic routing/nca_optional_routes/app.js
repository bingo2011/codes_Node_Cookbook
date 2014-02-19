
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);

});

app.configure('development', function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.staticCache());
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({dumpExceptions: true})); 
});

// Routes
app.get('/', routes.index);
app.get('/page', routes.mrpage);
app.get('/:page', routes.anypage);
app.get('/:page/:admin?', routes.anypageAdmin);

//a better way, see routes/index.js for the routes compliment:
//app.get('/:page/:admin((add|delete))', routes.anypageAdmin);




app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});  
