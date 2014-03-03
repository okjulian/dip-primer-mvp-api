var app = require('../../index.js'),
request = require('supertest'),
expect = require('chai').expect,
mongodb = require('mongoskin');

var MONGODB_URL = process.env.MONGODB_URL ||
 'mongodb://localhost:27017/dip-testdb';

describe('POST /email', function () {

  var db = mongodb.db(MONGODB_URL, {safe: true});

  after(function (done) {
    db.collection('users').drop(done);
  });

  it('deberia responder con codigo 200', function (done) {
    request(app)
    .post('/email')
    .send({email: 'nombre@example.com'})
    .expect(200, done);
  });

  it('deberia guardar email en la base de datos', function (done) {
    var testEmail = 'miguel@example.com';

    request(app)
    .post('/email')
    .send({email: testEmail})
    .end(function (err, res) {
      db.collection('users').findById(res.body._id, function (err, res) {
        expect(res.email)
        .to.equal(testEmail);
        done();
      });
    });
  });

});
