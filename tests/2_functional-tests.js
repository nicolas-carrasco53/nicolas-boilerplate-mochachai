const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);

  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });

    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello?name=xy_z')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello xy_z');
          done();
        });
    });

    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put('/travellers')
        .send({ surname: 'Colombo' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, 'Cristoforo');
          assert.equal(res.body.surname, 'Colombo');
          done();
        });
    });

    // #4
    test('send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({ surname: 'Colombo' })
        .end(function (err, res) {
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.equal(res.body.name, 'Cristoforo', 'res.body.name should be "Christoforo"');
          assert.equal(res.body.surname, 'Colombo', 'res.body.surname should be "Colombo"');
          done();
        });
    });
  });

  suite('"Famous Italian Explorers" form', function () {
    // #5 (reemplazado con tu código)
    test('send {surname: "Colombo"}', function (done) {
      // we setup the request for you...
      chai
        .request(server)
        .put('/travellers')
        /** send {surname: 'Colombo'} here **/
        .send({ surname: 'Colombo' })
        // .send({...})
        .end(function (err, res) {
          /** your tests here **/
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.equal(res.body.name, 'Cristoforo', 'res.body.name should be "Christoforo"');
          assert.equal(res.body.surname, 'Colombo', 'res.body.surname should be "Colombo"');
          done(); // Never forget the 'done()' callback...
        });
    });

    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      chai
        .request(server)
        .put('/travellers') 
        .send({ surname: 'da Verrazzano' })
        .end(function(err, res) {
         assert.equal(res.status, 200, 'response status should be 200');
         assert.equal(res.type, 'application/json', 'Response should be json');
         assert.equal(res.body.name, 'Giovanni');
         assert.equal(res.body.surname, 'da Verrazzano');
      done();
    });
  });
});
