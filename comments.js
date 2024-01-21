//create web server
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')));

// parse application/json
app.use(bodyParser.json())

//create a new file if it doesn't exist
var file = 'comments.json';
if (!fs.existsSync(file)) {
  fs.writeFile(file, '{"comments":[]}', function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });
}

//get comments
app.get('/comments', function(req, res) {
  fs.readFile(file, function(err, data) {
    if(err) throw err;
    res.send(data);
  });
});

//post comments
app.post('/comments', function(req, res) {
  fs.readFile(file, function(err, data) {
    if(err) throw err;
    var obj = JSON.parse(data);
    obj.comments.push(req.body);
    fs.writeFile(file, JSON.stringify(obj), function(err) {
      if(err) throw err;
      res.send(JSON.stringify(obj));
    });
  });
});

//start server
var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});


