const chai = require('chai');
var scanf = require('scanf');
const chaiHttp = require('chai-http');
const { assert } = require('console');
chai.use(chaiHttp);
const server = require('../server');
const db = require('../routers/db');
const bcrypt = require('bcryptjs');

const expect = chai.expect;
const apiAddress = 'http://localhost:9000';

const passport = require('passport');
const { use } = require('chai');
const { describe } = require('mocha');
const { sscanf } = require('scanf');
const { NULL } = require('mysql/lib/protocol/constants/types');
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
  var token = null;
  
  describe('GET all users', function() 
  {
    // login for token
    it('Should login if the correct credentials been given', async function () 
    {
      await chai.request(apiAddress)
          .post('/login')
          .auth("Kilpikalevi2000", "trololo")
          .then(response => {
              token = response.body.token;
          })
          .catch(error => {
              expect.fail(error)
          })
    })

    it('GET-method test for /users', async function() 
    {
      this.timeout(3000);
      await chai.request(apiAddress)
      .get('/users')
      //.auth('Kilpikalevi2000', 'trololo')
      .then(response => 
        {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.a('object');
            expect(response.body).to.have.a.property('user');
            expect(response.body.user).to.be.a('array');
            expect(response.body.user[0]).to.be.a('object');
            expect(response.body.user[0]).to.have.a.property('userId');
            expect(response.body.user[0]).to.have.a.property('username');
            expect(response.body.user[0]).to.have.a.property('password');
            expect(response.body.user[0]).to.have.a.property('name');
            expect(response.body.user[0]).to.have.a.property('email');
            expect(response.body.user[0]).to.have.a.property('phoneNumber');
        }).catch(error => 
            {
                expect.fail(error)
            })
    });
})

  describe( "Register user", function()
  {
    it('POST-method,Should add a new user by createuser', async function() 
    {
      this.timeout(5000);
      await chai.request(apiAddress)
      .post('/users/createuser')
      //.auth('Kilpikalevi2000', 'trololo')
      .send({
          //username has to be unique every time a new test is ran
                username: "Lala1",
                password: "trololo",
                name: "Kokonut",
                email: "fdosfdosjk@gmail.com",
                phoneNumber: "012345"
            })
        .then(response => 
            {
                expect(response.status).to.equal(201);
                return chai.request(apiAddress)
                .get('/users')
                //.auth('Kilpikalevi20000', 'trololo');  
            })
            
        .then(readResponse => 
            {
                //change username to match here too
                expect(readResponse.body.user[readResponse.body.user.length].username).to.equal("Lala1");
                //expect(bcrypt.compare("trololo", readResponse.body.user[readResponse.body.user.length-1].password)).to.equal(true);
                expect(readResponse.body.user[readResponse.body.user.length].name).to.equal("Kokonut");
                expect(readResponse.body.user[readResponse.body.user.length].email).to.equal("fdosfdosjk@gmail.com");
                expect(readResponse.body.user[readResponse.body.user.length].phoneNumber).to.equal("012345");
            })
            
    });

    it('Should NOT add a new user if username already exists', async function() 
    {
      this.timeout(5000);
      await chai.request(apiAddress)
      .post('/users/createuser')
      //.auth('Kilpikalevi2000', 'trololo')
      .send({
                username: "Kilpikalevi2000",
                password: "trololo",
                name: "Kokonut",
                email: "fdosfdosjk@gmail.com",
                phoneNumber: "012345"
            })
        .then(response => 
            {
                expect(response.status).to.equal(400);
            })
        .catch(error => 
            {
                expect.fail(error)
            })

    });
  });

  describe("DELETE user", function()
  {
    it("Should NOT delete an user because userId was not found", async function()
    {
        this.timeout(5000);
        await chai.request(apiAddress)
        .delete('/users/delete/1')
        .set({
          Authorization: `Bearer ${token}`
        })
        .then(response => 
          {
            expect(response.status).to.equal(404);
          })
        .catch(error => 
          {
            expect.fail(error)
          })
    })

  it("Should NOT delete an user because token was not found", async function()
  {
      this.timeout(5000);
      await chai.request(apiAddress)
      .delete('/users/delete/17')
      /*
      .set({
        Authorization: `Bearer ${token}`
      })
      */
      .then(response => 
        {
          expect(response.status).to.equal(401);
        })
      .catch(error => 
        {
          expect.fail(error)
        })
    })

    it('Delete-method,Should delete a user', async function() 
    {
        this.timeout(3000);
        await chai.request(apiAddress)
        .delete('/users/delete/30')
        .set({
            Authorization: `Bearer ${token}`
          })
        .then(response => {
            expect(response.status).to.equal(200);
        })
        .catch(error => {
            expect.fail(error)
        })
      });
  })
});
