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
const { describe } = require('mocha');
const { sscanf } = require('scanf');
const { NULL } = require('mysql/lib/protocol/constants/types');
const BasicStrategy = require('passport-http').BasicStrategy;


console.log("Albums test start now:");

describe('test operations Albums', function() 
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
  
  describe('Login and GET all albums', function() 
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

    it('GET-method test for /albums does not work', async function() 
    {
      this.timeout(3000);
      await chai.request(apiAddress)
      .get('/albums')
      //.auth('Kilpikalevi2000', 'trololo')
      
      //no albums present in the database yet, test fails
      .then(response => 
        {
            expect(response.status).to.equal(404);
        })
        .catch(error => 
          {
              expect.fail(error)
          })
      });

    it('GET-method test for /albums works', async function() 
    {
      this.timeout(3000);
      await chai.request(apiAddress)
      .get('/albums')
      //.auth('Kilpikalevi2000', 'trololo')
      
      //no albums present in the database yet, test fails
      .then(response => 
        {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.a('object');
            expect(response.body).to.have.a.property('albums');
            expect(response.body.albums).to.be.a('array');
            expect(response.body.albums[0]).to.be.a('object');
            expect(response.body.albums[0]).to.have.a.property('albumName');
            expect(response.body.albums[0]).to.have.a.property('albumLaunchDate');
            expect(response.body.albums[0]).to.have.a.property('albumPicture');
            expect(response.body.albums[0]).to.have.a.property('albumGenre');
        })
        .catch(error => 
          {
              expect.fail(error)
          })
    });
})

describe( "Create a album", function()
{
    //albumName field not filled
    it('Should NOT create a new album because no albumName was given', async function () 
    {
      this.timeout(5000);
      await chai.request(apiAddress)
      .post('/albums/28/createalbum')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
              albumName: "",
              albumLaunchDate: "1983-12-03",
              albumPicture: "shownomercy.png",
              albumGenre: "Thrash Metal"
          })
          .then(response => {
              expect(response.status).to.equal(400);
          })
          .catch(error => {
              expect.fail(error)
          })
    })
    
    //albumLaunchDate field not filled
    it('Should NOT create a new album because no albumLaunchDate was given', async function () 
    {
      this.timeout(5000);
      await chai.request(apiAddress)
      .post('/albums/28/createalbum')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
              albumName: "Show No Mercy",
              albumLaunchDate: "",
              albumPicture: "shownomercy.png",
              albumGenre: "Thrash Metal"
          })
          .then(response => {
              expect(response.status).to.equal(400);
          })
          .catch(error => {
              expect.fail(error)
          })
    })

    //albumPicture field not filled
    it('Should NOT create a new album because no albumPicture was given', async function () 
    {
      this.timeout(5000);
      await chai.request(apiAddress)
      .post('/albums/28/createalbum')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
              albumName: "Show No Mercy",
              albumLaunchDate: "1983-12-03",
              albumPicture: "",
              albumGenre: "Thrash Metal"
          })
          .then(response => {
              expect(response.status).to.equal(400);
          })
          .catch(error => {
              expect.fail(error)
          })
    })

    //albumGenre field not filled
    it('Should NOT create a new album because no albumGenre was given', async function () 
    {
      this.timeout(5000);
      await chai.request(apiAddress)
      .post('/albums/28/createalbum')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
            albumName: "Show No Mercy",
            albumLaunchDate: "1983-12-03",
            albumPicture: "shownomercy.png",
            albumGenre: ""
          })
          .then(response => {
              expect(response.status).to.equal(400);
          })
          .catch(error => {
              expect.fail(error)
          })
    })

    //should create a new album if all fields are filled
    it('Should add a new album by createalbum', async function() 
    {
      this.timeout(5000);
      await chai.request(apiAddress)
      .post('/albums/11/createalbum')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
            albumName: "Show No Mercy",
            albumLaunchDate: "1983-12-03",
            albumPicture: "shownomercy.png",
            albumGenre: "Thrash Metal"
            })
        .then(response => 
            {
                expect(response.status).to.equal(201);
                return chai.request(apiAddress)
                .get('/albums')  
            })
        .then(readResponse => 
            {
                expect(readResponse.body.albums[readResponse.body.albums.length-1].albumName).to.equal("Show No Mercy");
                expect(readResponse.body.albums[readResponse.body.albums.length-1].albumLaunchDate).to.equal("1983-12-03");
                expect(readResponse.body.albums[readResponse.body.albums.length-1].albumPicture).to.equal("shownomercy.png");
                expect(readResponse.body.albums[readResponse.body.albums.length-1].albumGenre).to.equal("Thrash Metal");
            })
    });
});

describe("DELETE albums", function()
{
    it("Should NOT delete an album because albumId was not found", async function()
    {
        this.timeout(5000);
        await chai.request(apiAddress)
        .delete('/albums/delete/9')
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

    it("Should NOT delete an album because token was not found", async function()
    {
        this.timeout(5000);
        await chai.request(apiAddress)
        .delete('/albums/delete/54')
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
    it('Delete-method,Should delete an album', async function() 
    {
        this.timeout(3000);
        await chai.request(apiAddress)
        .delete('/albums/delete/54')
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
