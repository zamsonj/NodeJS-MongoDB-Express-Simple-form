var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('customerData', ['users']);
var ObjectId = mongojs.ObjectId;

var app = express();

//here goes the Middlewares
//Template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Here goes the static content's path like css, jQuery, etc
app.use(express.static(path.join(__dirname, 'public')));

//Global variables
app.use(function(req, res, next){
	res.locals.errors = null;
	res.locals.users = null;
	next();
})
//middleware for express-validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value){
		var namespace = param.split('.')
		, root = namespace.shift()
		, formParam = root;

		while(namespace.length) {
			formParam = '[' +namespace.shift() +']';			
		}
		return{
			param: formParam,
			msg : msg,
			value : value
		};
	}
}));
//route
app.get('/', function(req, res){
	// find everything from database
	db.users.find(function (err, docs) {
		// docs is an array of all the documents in mycollection
		res.render("index", {
			title: "Registered Users",
			users: docs
		});
	})
	
});

app.post('/users/add', function(req, res){
	req.checkBody('first_name', 'First name is Required').notEmpty();
	req.checkBody('last_name', 'Last name is Required').notEmpty();
	req.checkBody('email', 'Email is Required').notEmpty();
	var errors = req.validationErrors();
	if(errors){
		console.log(errors);
		
		res.redirect('/');
	}else{		
		var newUser = {
			first_name : req.body.first_name,
			last_name : req.body.last_name,
			email : req.body.email
		}
		db.users.insert(newUser, function(err, result){
			if(err){
				console.log(err);
			}
			res.redirect('/');
		});
	}
});
app.delete('/users/delete/:id', function(req, res){
	db.users.remove({_id:ObjectId(req.params.id)}, function(err, result){
		if(err){
			console.log(err);
		}
		res.redirect('/');
	})
})

//set port
app.listen(3000, function(){
	console.log('Server started on port 3000...');
});