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
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({ surname: 'da Verrazzano' })
        .end(function (err, res) {
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.equal(res.body.name, 'Giovanni', 'res.body.name should be "Giovanni"');
          assert.equal(res.body.surname, 'da Verrazzano', 'res.body.surname should be "da Verrazzano"');
          done();
        });
    });
  });

  suite('"Famous Italian Explorers" form', function () {
    const Browser = require('zombie');
    Browser.site = 'https://56d97e13-b589-4020-b47f-a97613b6c870-00-1vqzryrtx67zo.spock.replit.dev/';

    suite('Functional Tests with Zombie.js', function () {
      const browser = new Browser();

      suiteSetup(function (done) {
        return browser.visit('/', done);
      });

      // #5
      test('Submit the surname "Colombo" in the HTML form', function (done) {
        browser
          .fill('surname', 'Colombo')
          .pressButton('submit', function () {
            browser.assert.text('#surname', 'Colombo');
            done();
          });
      });

      // #6
      test('submit "surname" : "Colombo" - write your e2e test...', function (done) {
        browser
          .fill('surname', 'Colombo')
          .pressButton('submit', function () {
            // assert that status is OK 200
            browser.assert.success();
            // assert that the text inside the element 'span#name' is 'Cristoforo'
            browser.assert.text('span#name', 'Cristoforo');
            // assert that the text inside the element 'span#surname' is 'Colombo'
            browser.assert.text('span#surname', 'Colombo');
            // assert that the element(s) 'span#dates' exist and their count is 1
            browser.assert.element('span#dates', 1);

            done();
          });
      });
    });
  });
});
