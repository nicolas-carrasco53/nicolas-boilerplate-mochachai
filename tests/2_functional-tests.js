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
    test('send {surname: "da Verrazzano"}', function (done) {
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
    // #5
   const Browser = require('zombie');
Browser.site = 'https://56d97e13-b589-4020-b47f-a97613b6c870-00-1vqzryrtx67zo.spock.replit.dev/'; // Asegurate de que esta URL coincida con la de tu proyecto

suite('Functional Tests with Zombie.js', function () {
   suite('Functional Tests with Zombie.js', function () {
  const browser = new Browser();

  suiteSetup(async function () {
     await browser.visit('/');
  });

  test('Submit the surname "Colombo" in the HTML form', function (done) {
    await browser.fill('surname', 'Colombo');
    await browser.pressButton('submit');
        browser.assert.success(); 
        browser.assert.text('span#name', 'Colombo'); 
        browser.assert.element('span#dates');
      });
  });
});

    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      browser.fill('surname','Vespucci')
                   .pressButton('submit', () => {
               browser.assert.success()
               browser.assert.text('span#name', 'Amerigo')
               browser.assert.text('span#name', 'Vespucci')
               browser.assert.element('span#dates', 1)
            done();
        })               
    });
  });
});
