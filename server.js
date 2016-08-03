const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view-engine", "pug");

app.get('/', function(req, res) {
  res.render("index.pug");
});

app.post('/calc', function(req, res) {
  var result = eval(req.body.calc);
  res.json({ value: result });
});

app.listen(3001, function() {
  console.log('listening on 3001');
});