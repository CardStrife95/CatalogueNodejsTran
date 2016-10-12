
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();
var produit = require('./routes/produit.js');
var catalogue = require('./routes/catalogue.js')

var mysql = require('mysql');
var connexion = require('express-myconnection');

app.use(connexion(mysql,{
	host : '127.0.0.1',
	user : 'root',
	password : '',
	port : 3306,
	database : 'catalogue',	
},'pool'));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/catalogue',catalogue.list);
app.get('/catalogue/:id',catalogue.listOne);
app.post('/catalogue/:id',catalogue.add_produit);
app.get('/catalogue/edit/:id',catalogue.edit_cata);
app.post('/catalogue/:id/produit/:idProduit',catalogue.save_edit_produit);
app.get('/catalogue/:id/produit/:idProduit',catalogue.delete_produit);
app.get('/catalogue/delete/:id',catalogue.delete_save);

app.get('/produit',produit.list);
app.get('/produit/add',produit.add);
app.post('/produit/add',produit.save);
app.get('/produit/edit/:id',produit.edit);
app.post('/produit/edit/:id',produit.save_edit);
app.get('/produit/delete/:id',produit.delete_save);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
