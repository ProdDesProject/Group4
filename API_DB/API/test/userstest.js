const chai = require('chai');
var scanf = require('scanf');
const chaiHttp = require('chai-http');
const { assert } = require('console');
const users2 = require('../routers/users2');
chai.use(chaiHttp);
const server = require('../server');
const db = require('../routers/db');

const expect = chai.expect;
const apiAddress = 'http://localhost:3000';

const passport = require('passport');
const { use } = require('chai');
const { describe } = require('mocha');
const { sscanf } = require('scanf');
const BasicStrategy = require('passport-http').BasicStrategy;


console.log("Usertest start now:");

describe('test operations User', function() 
{

  before(function() 
  {
    server.start();
  });

  after(function() 
  {
    server.stop();
  });

  var storedresponse;
  var storedLenght;

  
  describe('User Get-,Post-,Delete-methods', function() 
  {

    it('GET-method test for /users', async function() 
    {
      this.timeout(3000);
      await chai.request(apiAddress)
      .get('/users')
      .auth('tester', 'testerpassword')
      .then(response => 
        {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.a('object');
            expect(response.body).to.have.a.property('user');
            expect(response.body.user).to.be.a('array');
            expect(response.body.user[0]).to.be.a('object');
            expect(response.body.user[0]).to.have.a.property('id');
            expect(response.body.user[0]).to.have.a.property('username');
            expect(response.body.user[0]).to.have.a.property('email');
            expect(response.body.user[0]).to.have.a.property('password');
            expect(response.body.user[0]).to.have.a.property('name');
            expect(response.body.user[0]).to.have.a.property('streetaddress');
            expect(response.body.user[0]).to.have.a.property('city');
            expect(response.body.user[0]).to.have.a.property('country');
            expect(response.body.user[0]).to.have.a.property('dateofbirth');
        }).catch(error => 
            {
                expect.fail(error)
            })
    });
  
    it('POST-method,Should add a new user by createuser', async function() 
    {
      this.timeout(5000);
      await chai.request(apiAddress)
      .post('/users/createuser')
      .auth('tester', 'testerpassword')
      .send({
                username: "TestiKalle",
                email: "kalle@gmail.com",
                password: "kallesalis123",
                name: "Kalle",
                streetaddress: "Kallenkoti 12",
                city: "Kallekaupunki",
                country: "Kallemaa",
                dateofbirth: "01.01.1000"
            })
        .then(response => 
            {
                expect(response.status).to.equal(201);
                return chai.request(apiAddress)
                .get('/users')
                .auth('tester', 'testerpassword');  
            })
        .then(readResponse => 
            {
                expect(readResponse.body.user[readResponse.body.user.length-1].username).to.equal("TestiKalle");
                expect(readResponse.body.user[readResponse.body.user.length-1].email).to.equal("kalle@gmail.com");
                expect(readResponse.body.user[readResponse.body.user.length-1].name).to.equal("Kalle");
                expect(readResponse.body.user[readResponse.body.user.length-1].streetaddress).to.equal("Kallenkoti 12");
                expect(readResponse.body.user[readResponse.body.user.length-1].city).to.equal("Kallekaupunki");
                expect(readResponse.body.user[readResponse.body.user.length-1].country).to.equal("Kallemaa");
                expect(readResponse.body.user[readResponse.body.user.length-1].dateofbirth).to.equal("01.01.1000");
            
            }).catch(error => 
                {
                    expect.fail(error)
                })

    });

    it('Delete-method,Should delete a user', async function() 
    {
        this.timeout(3000);
        await chai.request(apiAddress)
        .get('/users')
        .auth('tester', 'testerpassword')
        .then(response => 
            {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.a('object');
                expect(response.body).to.have.a.property('user');
                expect(response.body.user).to.be.a('array');
            
                storedresponse = response.body.user;
                storedLenght = response.body.user.length;

                return chai.request(apiAddress)
                .delete('/users/delete/'+storedLenght)
                .auth('tester', 'testerpassword');
            
          }).catch(error => 
            {
                expect.fail(error)
            })
      });
  })

});
