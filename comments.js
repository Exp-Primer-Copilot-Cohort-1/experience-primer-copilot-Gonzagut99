//create web server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'comments'
});

//connect to mysql
connection.connect(function(err){
	if(err){
		console.log('Error connecting to Db');
		return;
	}
	console.log('Connection established');
});

//use bodyParser
app.use(bodyParser.urlencoded({extended: true}));

//get all comments
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

//post comments
app.post('/', function(req, res){
	var comment = {comment: req.body.comment};
	connection.query('INSERT INTO comments SET ?', comment, function(err, result){
		if(err) throw err;
		console.log(result);
	});
	res.redirect('/');
});

//get all comments
app.get('/getComments', function(req, res){
	connection.query('SELECT * FROM comments', function(err, rows, fields){
		if(err) throw err;
		res.send(rows);
	});
});

//delete comments
app.delete('/deleteComments', function(req, res){
	connection.query('DELETE FROM comments', function(err, rows, fields){
		if(err) throw err;
		res.send(rows);
	});
});

//get one comment
app.get('/getComments/:id', function(req, res){
	connection.query('SELECT * FROM comments WHERE id = ?', [req.params.id], function(err, rows, fields){
		if(err) throw err;
		res.send(rows);
	});
});

//delete one comment
app.delete('/deleteComments/:id', function(req, res){
	connection.query('DELETE FROM comments WHERE id = ?', [req.params.id], function(err, rows, fields){
		if(err) throw err;
		res.send(rows);
	});
});

//update one comment
app.put('/updateComments/:id', function(req, res){
	connection.query('UPDATE comments SET comment = ? WHERE id = ?', [req.body.comment, req.params.id], function(err, rows, fields){
		if(err) throw err;
		res.send(rows);
	});
});

//start server
app.listen(8080);
console.log('Server started on port 8080');


