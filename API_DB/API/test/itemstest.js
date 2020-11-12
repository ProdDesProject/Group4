const chai = require('chai');
var scanf = require('scanf');
const chaiHttp = require('chai-http');
const { assert } = require('console');
const users2 = require('../routers/users2');
chai.use(chaiHttp);
const server = require('../server');
const db = require('../routers/db');

const userstest = require('./userstest');

const expect = chai.expect;
const apiAddress = 'http://localhost:3000';

const passport = require('passport');
const { use } = require('chai');
const { describe } = require('mocha');
const { sscanf } = require('scanf');
const BasicStrategy = require('passport-http').BasicStrategy;


console.log("Itemtest start now:");
 
describe('test operations Items', function() 
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
  var storedTodos;

    describe('Items GET-,POST-,PUT-,PUT2-,DELETE-methods', function() {

        
      it('GET-method: test for /items', async function() {
        this.timeout(4000);
        await chai.request(apiAddress)
          .get('/items/objectresponse')
          .auth('tester', 'testerpassword')
          .then(response => {
            //expect(response.status).to.equal(200);
            //console.log(response.body);
            
            expect(response.body).to.be.a('object');
            //console.log(response.body);
            expect(response.body).to.have.a.property('ItemsData');
            expect(response.body.ItemsData).to.be.a('array');
            expect(response.body.ItemsData[0]).to.be.a('object');
            expect(response.body.ItemsData[0]).to.have.a.property('id');
            expect(response.body.ItemsData[0]).to.have.a.property('title');
            expect(response.body.ItemsData[0]).to.have.a.property('description');
            expect(response.body.ItemsData[0]).to.have.a.property('category');
            expect(response.body.ItemsData[0]).to.have.a.property('location');
            expect(response.body.ItemsData[0]).to.have.a.property('askingprice');
            expect(response.body.ItemsData[0]).to.have.a.property('dateofposting');
            expect(response.body.ItemsData[0]).to.have.a.property('deliverytype');
            expect(response.body.ItemsData[0]).to.have.a.property('sellername');
            expect(response.body.ItemsData[0]).to.have.a.property('sellermail');
            expect(response.body.ItemsData[0]).to.have.a.property('sellerphonenumber');
            expect(response.body.ItemsData[0]).to.have.a.property('image1');
            expect(response.body.ItemsData[0]).to.have.a.property('image2');
            expect(response.body.ItemsData[0]).to.have.a.property('image3');
            expect(response.body.ItemsData[0]).to.have.a.property('image4');
            storedTodos = response.body.ItemsData[0].id;
            console.log(storedTodos);
          })
          .catch(error => {
            expect.fail(error)
          })
      })


      it('GET-method: test for /items/:id', async function() {
        //this.timeout(3000);
        await chai.request(apiAddress)
          .get('/items/objectresponse/'+storedTodos)
          .auth('tester', 'testerpassword')
          .then(response => {
            //expect(response.status).to.equal(200);
            expect(response.body).to.be.a('object');
            //console.log(response.body);
            expect(response.body).to.have.a.property('ItemsData');
            expect(response.body.ItemsData).to.be.a('array');
            expect(response.body.ItemsData[0]).to.be.a('object');
            expect(response.body.ItemsData[0]).to.have.a.property('id');
            expect(response.body.ItemsData[0]).to.have.a.property('title');
            expect(response.body.ItemsData[0]).to.have.a.property('description');
            expect(response.body.ItemsData[0]).to.have.a.property('category');
            expect(response.body.ItemsData[0]).to.have.a.property('location');
            expect(response.body.ItemsData[0]).to.have.a.property('askingprice');
            expect(response.body.ItemsData[0]).to.have.a.property('dateofposting');
            expect(response.body.ItemsData[0]).to.have.a.property('deliverytype');
            expect(response.body.ItemsData[0]).to.have.a.property('sellername');
            expect(response.body.ItemsData[0]).to.have.a.property('sellermail');
            expect(response.body.ItemsData[0]).to.have.a.property('sellerphonenumber');
            expect(response.body.ItemsData[0]).to.have.a.property('image1');
            expect(response.body.ItemsData[0]).to.have.a.property('image2');
            expect(response.body.ItemsData[0]).to.have.a.property('image3');
            expect(response.body.ItemsData[0]).to.have.a.property('image4');
          })
          .catch(error => {
            expect.fail(error)
          })
      })



      it('POST-method:Should add a new item by create', async function() {
        this.timeout(5000);
        await chai.request(apiAddress)
          .post('/items/create')
          .auth('tester', 'testerpassword')
          .send({
              title: "Selling used radio",
              description: "Used radio",
              category: "Radio",
              location: "Oulu,FIN",
              askingprice: "100",
              dateofposting: "1591012800",
              deliverytype: "Pickup",
              sellername: "Kalle Kovapää",
              sellermail: "Kalle60@gmail.com",
              sellerphonenumber: "+358 40 123 123",
              image1:"NULL",
              image2:"NULL",
              image3:"NULL",
              image4:"NULL"
          })
          .then(response => {
            //this.timeout(2000);
            expect(response.status).to.equal(201);
            return chai.request(apiAddress).get('/items/objectresponse').auth('tester', 'testerpassword');
          })
          .then(readResponse => {
            //console.log(readResponse.body.ItemsData);
            //console.log("!!!!!!!!!!!!!!!"+readResponse.body.ItemsData.length);
            expect(readResponse.body.ItemsData[readResponse.body.ItemsData.length-1].title).to.equal("Selling used radio");
            expect(readResponse.body.ItemsData[readResponse.body.ItemsData.length-1].description).to.equal("Used radio");
            expect(readResponse.body.ItemsData[readResponse.body.ItemsData.length-1].category).to.equal("Radio");
            expect(readResponse.body.ItemsData[readResponse.body.ItemsData.length-1].location).to.equal("Oulu,FIN");
            expect(readResponse.body.ItemsData[readResponse.body.ItemsData.length-1].askingprice).to.equal("100");
            expect(readResponse.body.ItemsData[readResponse.body.ItemsData.length-1].dateofposting).to.equal("1591012800");
            expect(readResponse.body.ItemsData[readResponse.body.ItemsData.length-1].deliverytype).to.equal("Pickup");
            expect(readResponse.body.ItemsData[readResponse.body.ItemsData.length-1].sellername).to.equal("Kalle Kovapää");
            expect(readResponse.body.ItemsData[readResponse.body.ItemsData.length-1].sellermail).to.equal("Kalle60@gmail.com");
            expect(readResponse.body.ItemsData[readResponse.body.ItemsData.length-1].sellerphonenumber).to.equal("+358 40 123 123");
          })
          .catch(error => {
            expect.fail(error)
          })
      })

  
      it('PUT-method: Should edit object', async function() {
        this.timeout(3000);
        await chai.request(apiAddress)
          .put('/items/change/1')
          .auth('tester', 'testerpassword')
          .send({
              title: "Selling used car",
              description: "Used BMW 1995, black, diesel, etc.",
              category: "Cars",
              location: "London,YK",
              images: "asd123asd123asd123",
              askingprice: "2000",
              dateofposting: "1591012800",
              deliverytype: "Pickup",
              sellername: "Bill BMW",
              sellermail: "Billruleforever@gmail.com",
              sellerphonenumber: "+44 23 448 112",
              image1:"NULL",
              image2:"NULL",
              image3:"NULL",
              image4:"NULL"
          })
          .then(response => {
            expect(response).to.have.property('status');
            expect(response.status).to.equal(201);
            //this.timeout(3000);
            return chai.request(apiAddress)
            .get('/items/objectresponse/1')
            .auth('tester', 'testerpassword')
          })
          .then(checkResponse => {
            //console.log("__________________");
            
            expect(checkResponse.body).to.have.a.property('ItemsData');
            expect(checkResponse.body.ItemsData).to.be.a('array');
            expect(checkResponse.body.ItemsData[checkResponse.body.ItemsData.length-1].title).to.equal("Selling used car");
          })
          .catch(error => {
            expect.fail(error);
          });
      });

      it('Delete-method,Should delete a item', async function() {
        this.timeout(3000);
        await chai.request(apiAddress)
          .get('/items/objectresponse')
          .auth('tester', 'testerpassword')
          .then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.a('object');
            expect(response.body).to.have.a.property('ItemsData');
            expect(response.body.ItemsData).to.be.a('array');
            
            storedresponse = response.body.ItemsData;
            storedLenght = response.body.ItemsData.length;


            return chai.request(apiAddress)
            .delete('/items/delete/'+storedLenght)
            .auth('tester', 'testerpassword');

          })
          .catch(error => {
            expect.fail(error)
          })

      })

    })


});