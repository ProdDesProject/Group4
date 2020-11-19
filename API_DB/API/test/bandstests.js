const chai = require('chai');
var scanf = require('scanf');
const chaiHttp = require('chai-http');
const { assert } = require('console');
chai.use(chaiHttp);
const server = require('../server');

const expect = chai.expect;
const apiAddress = 'http://localhost:9000';

const passport = require('passport');
const { use } = require('chai');
const { describe, it } = require('mocha');
const { sscanf } = require('scanf');
const { NULL } = require('mysql/lib/protocol/constants/types');
const BasicStrategy = require('passport-http').BasicStrategy;


console.log("Bands test start now:");

describe('test operations Bands', function() 
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
  
  describe('Login and GET all bands', function() 
  {
    // login for token
    it('Should login if the correct credentials been given', async function () 
    {
      await chai.request(apiAddress)
          .post('/login')
          .auth("Kilpikalevi2000", "trololo")
          .then(response => 
          {
              token = response.body.token;
          })
          .catch(error => 
          {
              expect.fail(error)
          })
    })

    it('GET-method test for /bands', async function() 
    {
      this.timeout(3000);
      await chai.request(apiAddress)
      .get('/bands')
      //.auth('Kilpikalevi2000', 'trololo')
      .then(response => 
        {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.a('object');
            expect(response.body).to.have.a.property('bands');
            expect(response.body.bands).to.be.a('array');
            expect(response.body.bands[0]).to.be.a('object');
            expect(response.body.bands[0]).to.have.a.property('bandId');
            expect(response.body.bands[0]).to.have.a.property('bandName');
            expect(response.body.bands[0]).to.have.a.property('bandLogo');
            expect(response.body.bands[0]).to.have.a.property('country');
            expect(response.body.bands[0]).to.have.a.property('bandToken');
        }).catch(error => 
            {
                expect.fail(error)
            })
    });
})

describe( "Create a band", function()
{
    //token not provided
    it('Should NOT create a new band because no token provided', async function () 
    {
      this.timeout(5000);
      await chai.request(apiAddress)
      .post('/bands/createband')
      /*
      .set({
        Authorization: `Bearer ${token}`
      })
      */
      .send({
              nsfw: 1,
              bandName: "Turmion Kätilöt",
              bandLogo: "TK.jpg",
              country: "Finland"
          })
          .then(response => {
              expect(response.status).to.equal(401);
          })
          .catch(error => {
              expect.fail(error)
          })
    })
    //nsfw field not filled
    it('Should NOT create a new band because no nsfw flag was given', async function () 
    {
      this.timeout(5000);
      await chai.request(apiAddress)
      .post('/bands/createband')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
              nsfw: null,
              bandName: "Turmion Kätilöt",
              bandLogo: "TK.jpg",
              country: "Finland"
          })
          .then(response => {
              expect(response.status).to.equal(400);
          })
          .catch(error => {
              expect.fail(error)
          })
    })

    //bandName field not filled
    it('Should NOT create a new band because no bandName was given', async function () 
    {
      this.timeout(5000);
      await chai.request(apiAddress)
      .post('/bands/createband')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
              nsfw: 1,
              bandName: "",
              bandLogo: "TK.jpg",
              country: "Finland"
          })
          .then(response => {
              expect(response.status).to.equal(400);
          })
          .catch(error => {
              expect.fail(error)
          })
    })

    //bandLogo field not filled
    it('Should NOT create a new band because no bandLogo was given', async function () 
    {
      this.timeout(5000);
      await chai.request(apiAddress)
      .post('/bands/createband')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
              nsfw: 1,
              bandName: "Turmion Kätilöt",
              bandLogo: "",
              country: "Finland"
          })
          .then(response => {
              expect(response.status).to.equal(400);
          })
          .catch(error => {
              expect.fail(error)
          })
    })

    //country field not filled
    it('Should NOT create a new band because no country was given', async function () 
    {
      this.timeout(5000);
      await chai.request(apiAddress)
      .post('/bands/createband')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
              nsfw: 1,
              bandName: "Turmion Kätilöt",
              bandLogo: "TK.jpg",
              country: ""
          })
          .then(response => {
              expect(response.status).to.equal(400);
          })
          .catch(error => {
              expect.fail(error)
          })
    })

    //should create a new band if all fields are filled
    it('Should add a new band by createband', async function() 
    {
      this.timeout(5000);
      await chai.request(apiAddress)
      .post('/bands/createband')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
              nsfw: 1,
              bandName: "Turmion Kätilöt",
              bandLogo: "TK.jpg",
              country: "Finland"
            })
        .then(response => 
            {
                expect(response.status).to.equal(201);
                return chai.request(apiAddress)
                .get('/bands')  
            })
        .then(readResponse => 
            {
                expect(readResponse.body).to.be.a('object');
                expect(readResponse.body.bands).to.be.a('array');
                /*
                expect(readResponse.body.bands).to.have.a.property('nsfw');
                expect(readResponse.body.bands).to.have.a.property('bandName');
                expect(readResponse.body.bands).to.have.a.property('bandLogo');
                expect(readResponse.body.bands).to.have.a.property('country');
                */
                /*
                expect(readResponse.body.bands[readResponse.body.bands.length-1].nsfw).to.equal(1);
                expect(readResponse.body.bands[readResponse.body.bands.length-1].bandName).to.equal("Turmion Kätilöt");
                expect(readResponse.body.bands[readResponse.body.bands.length-1].bandLogo).to.equal("TK.jpg");
                expect(readResponse.body.bands[readResponse.body.bands.length-1].country).to.equal("Finland");
                */
            })
    });
});

//testing the put method for the bands
describe("Modify a band", function()
  {
      it("Should NOT modify a band because bandId was not found", async function()
      {
        this.timeout(5000);
        await chai.request(apiAddress)
        .put('/bands/modify/9')
        .set({
          Authorization: `Bearer ${token}`
        })
        .send({
                nsfw: 1,
                bandName: "Turmion Kätilöt",
                bandLogo: "TK1.jpg",
                country: "Finland"
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

      it("Should NOT modify a band because token was not found", async function()
      {
        this.timeout(5000);
        await chai.request(apiAddress)
        .put('/bands/modify/36')
        /*
        .set({
          Authorization: `Bearer ${token}`
        })
        */
        .send({
                nsfw: 1,
                bandName: "Turmion Kätilöt",
                bandLogo: "TK1.jpg",
                country: "Finland"
              })
        .then(response => 
          {
            expect(response.status).to.equal(401);
          })
        .catch(error => 
          {
            expect.fail(error)
          })
      })

          //bandName field not filled
      it('Should NOT modify a band because no bandName was given', async function () 
      {
          this.timeout(5000);
          await chai.request(apiAddress)
          .put('/bands/modify/40')
          .set({
            Authorization: `Bearer ${token}`
          })
          .send({
                  nsfw: 1,
                  bandName: "",
                  bandLogo: "TK.jpg",
                  country: "Finland"
              })
              .then(response => {
                  expect(response.status).to.equal(400);
              })
              .catch(error => {
                  expect.fail(error)
              })
      })

      //bandLogo field not filled
      it('Should NOT modify a band because no bandLogo was given', async function () 
      {
          this.timeout(5000);
          await chai.request(apiAddress)
          .put('/bands/modify/40')
          .set({
            Authorization: `Bearer ${token}`
          })
          .send({
                  nsfw: 1,
                  bandName: "Turmion Kätilöt",
                  bandLogo: "",
                  country: "Finland"
              })
              .then(response => {
                  expect(response.status).to.equal(400);
              })
              .catch(error => {
                  expect.fail(error)
              })
      })

      //country field not filled
      it('Should NOT modify a band because no country was given', async function () 
      {
          this.timeout(5000);
          await chai.request(apiAddress)
          .put('/bands/modify/40')
          .set({
            Authorization: `Bearer ${token}`
          })
          .send({
                  nsfw: 1,
                  bandName: "Turmion Kätilöt",
                  bandLogo: "TK.jpg",
                  country: ""
              })
              .then(response => {
                  expect(response.status).to.equal(400);
              })
              .catch(error => {
                  expect.fail(error)
              })
      })

      it("Put-method, Should modify a band", async function()
      {
        this.timeout(5000);
        await chai.request(apiAddress)
        .put('/bands/modify/40')
        .set({
          Authorization: `Bearer ${token}`
        })
        .send({
                nsfw: 1,
                bandName: "Turmion Kätilöt",
                bandLogo: "TK1.jpg",
                country: "Finland"
              })
          .then(response => 
              {
                  expect(response.status).to.equal(200);
                  /*
                  expect(response.body).to.be.a('object');
                  expect(response.body.bands).to.be.a('array');
                  expect(response.body.bands).to.have.a.property('nsfw');
                  expect(response.body.bands).to.have.a.property('bandName');
                  expect(response.body.bands).to.have.a.property('country');
                  expect(response.body.bandLogo).to.equal('TK1.jpg');
                  */
                  return chai.request(apiAddress)
                  .get('/bands')  
              })
          .then(readResponse => 
              {
                  expect(readResponse.body.bands[readResponse.body.bands.length-1].nsfw).to.equal(1);
                  expect(readResponse.body.bands[readResponse.body.bands.length-1].bandName).to.equal("Turmion Kätilöt");
                  expect(readResponse.body.bands[readResponse.body.bands.length-1].bandLogo).to.equal("TK.jpg");
                  expect(readResponse.body.bands[readResponse.body.bands.length-1].country).to.equal("Finland");
              })
            
          .catch( error =>
            {
              expect.fail(error);
            })
      });
  })
  //testing the delete method for the bands
  describe("DELETE bands", function()
  {
      it("Should NOT delete a band because bandId was not found", async function()
      {
          this.timeout(5000);
          await chai.request(apiAddress)
          .delete('/bands/delete/9')
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

      it("Should NOT delete a band because token was not found", async function()
      {
          this.timeout(5000);
          await chai.request(apiAddress)
          .delete('/bands/delete/10')
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

      it('Delete-method,Should delete a band', async function() 
      {
          this.timeout(3000);
          await chai.request(apiAddress)
          .delete('/bands/delete/40')
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
