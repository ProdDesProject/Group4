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


console.log("Songs test start now:");

describe('test operations songs', function() 
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
  
  describe('Login and GET all songs', function() 
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

    it('GET-method test for /songs', async function() 
    {
      this.timeout(3000);
      await chai.request(apiAddress)
      .get('/songs')
      //.auth('Kilpikalevi2000', 'trololo')
      
      //no songs present in the database yet, test fails
      .then(response => 
        {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.a('object');
            expect(response.body).to.have.a.property('songs');
            expect(response.body.songs).to.be.a('array');
            expect(response.body.songs[0]).to.be.a('object');
            expect(response.body.songs[0]).to.have.a.property('songName');
            expect(response.body.songs[0]).to.have.a.property('MP3');
            expect(response.body.songs[0]).to.have.a.property('MP4');
        })
        .catch(error => 
          {
              expect.fail(error)
          })
    });
})

describe( "Create a song", function()
{
    //songName field not filled
    it('Should NOT create a new song because no songName was given', async function () 
    {
      this.timeout(5000);
      await chai.request(apiAddress)
      .post('/songs/28/createsong')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
              songName: "",
              MP3: "blut.mp3",
              MP4: "blut.mp4",
          })
          .then(response => {
              expect(response.status).to.equal(400);
          })
          .catch(error => {
              expect.fail(error)
          })
    })
    
    //MP3 field not filled
    it('Should NOT create a new song because no MP3 was given', async function () 
    {
      this.timeout(5000);
      await chai.request(apiAddress)
      .post('/songs/28/createsong')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
            songName: "Blut",
            MP3: "",
            MP4: "blut.mp4",
          })
          .then(response => {
              expect(response.status).to.equal(400);
          })
          .catch(error => {
              expect.fail(error)
          })
    })

    //MP4 field not filled
    it('Should NOT create a new song because no MP4 was given', async function () 
    {
      this.timeout(5000);
      await chai.request(apiAddress)
      .post('/songs/28/createsong')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
              songName: "Blut",
              MP3: "blut.mp3",
              MP4: "",
          })
          .then(response => {
              expect(response.status).to.equal(400);
          })
          .catch(error => {
              expect.fail(error)
          })
    })

    //should create a new song if all fields are filled
    it('Should add a new song by createsong', async function() 
    {
      this.timeout(5000);
      await chai.request(apiAddress)
      .post('/songs/28/createsong')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
            songName: "Blut",
            MP3: "blut.mp3",
            MP4: "blut.mp4",
            })
        .then(response => 
            {
                expect(response.status).to.equal(201);
                return chai.request(apiAddress)
                .get('/songs')  
            })
        .then(readResponse => 
            {
                expect(readResponse.body.songs[readResponse.body.songs.length-1].songName).to.equal("Blut");
                expect(readResponse.body.songs[readResponse.body.songs.length-1].MP3).to.equal("blut.mp3");
                expect(readResponse.body.songs[readResponse.body.songs.length-1].MP4).to.equal("blut.mp4");
            })
    });
});

describe("DELETE songs", function()
{
    it("Should NOT delete a song because songId was not found", async function()
    {
        this.timeout(5000);
        await chai.request(apiAddress)
        .delete('/songs/delete/9')
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

    it("Should NOT delete a song because token was not found", async function()
    {
        this.timeout(5000);
        await chai.request(apiAddress)
        .delete('/songs/delete/23')
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
    it('Delete-method,Should delete an song', async function() 
    {
        this.timeout(3000);
        await chai.request(apiAddress)
        .delete('/songs/delete/36')
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