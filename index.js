var express = require('express'),
app = express(),
mongo = require('mongoskin');

var MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/dip-testdb";

app.use(express.json());
app.use(express.urlencoded());

app.post('/email', function(req, res){
  var db = mongo.db(MONGODB_URL, {safe: true});
  db.collection('users').insert({email: req.body.email}, function (err, user) {
    res.json({_id: user[0]._id});
  });
});

module.exports = app;
