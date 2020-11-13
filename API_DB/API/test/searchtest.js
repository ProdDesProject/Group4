const chai = require('chai');
var scanf = require('scanf');
const chaiHttp = require('chai-http');
const { assert } = require('console');
const users2 = require('../routers/users2');
chai.use(chaiHttp);
const server = require('../server');
const db = require('../routers/db');

const expect = chai.expect;
const apiAddress = 'http://localhost:9000';

const passport = require('passport');
const { use } = require('chai');
const { describe } = require('mocha');
const { sscanf } = require('scanf');
const BasicStrategy = require('passport-http').BasicStrategy;


console.log("Searchtest start now:");

describe('test operations Users/search', function() 
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

    describe('GET-,POST-Methods for /items/search', function() 
    {
      it('POST-method: Should add item and GET-method for checking search/category', async function() 
      {
        this.timeout(5000);
        await chai.request(apiAddress)
          .post('/items/create')
          .auth('tester', 'testerpassword')
          
          .send(
            {
              title: "Selling used bike",
              description: "Used bike",
              category: "Bikes",
              location: "London,YK",
              askingprice: "2000",
              dateofposting: "1591012800",
              deliverytype: "Pickup",
              sellername: "Jack Ruthless",
              sellermail: "Jack@gmail.com",
              sellerphonenumber: "+44 23 448 112",
              image1:"NULL",
              image2:"NULL",
              image3:"NULL",
              image4:"NULL"
            })
          .then(response => 
            {
            //expect(response).to.have.property('status');
            //expect(response.status).to.equal(201);
            this.timeout(5000);
            return chai.request(apiAddress)
            .get('/items/search/category/Bikes')
          })
          .then(checkResponse => {
            expect(checkResponse.body).to.be.a('object');
            console.log(checkResponse.body);

            expect(checkResponse.body).to.have.a.property('ItemsData');
            expect(checkResponse.body.ItemsData).to.be.a('array');
            //console.log(checkResponse)
            
            console.log(checkResponse.body.ItemsData[0].sellername);

            //expect(checkResponse.body.results[0]).to.be.a('object');

            expect(checkResponse.body.ItemsData[0]).to.have.a.property('id');
            expect(checkResponse.body.ItemsData[0]).to.have.a.property('title');
            expect(checkResponse.body.ItemsData[0]).to.have.a.property('description');
            expect(checkResponse.body.ItemsData[0]).to.have.a.property('category');
            expect(checkResponse.body.ItemsData[0]).to.have.a.property('location');
            expect(checkResponse.body.ItemsData[0]).to.have.a.property('askingprice');
            expect(checkResponse.body.ItemsData[0]).to.have.a.property('dateofposting');
            expect(checkResponse.body.ItemsData[0]).to.have.a.property('deliverytype');
            expect(checkResponse.body.ItemsData[0]).to.have.a.property('sellername');
            expect(checkResponse.body.ItemsData[0]).to.have.a.property('sellermail');
            expect(checkResponse.body.ItemsData[0]).to.have.a.property('sellerphonenumber');
            expect(checkResponse.body.ItemsData[0]).to.have.a.property('image1');
            expect(checkResponse.body.ItemsData[0]).to.have.a.property('image2');
            expect(checkResponse.body.ItemsData[0]).to.have.a.property('image3');
            expect(checkResponse.body.ItemsData[0]).to.have.a.property('image4');

            expect(checkResponse.body.ItemsData[0]).to.have.a.property('category') == 'Bikes';
            storedresponse = checkResponse.body.ItemsData;
            storedLenght = checkResponse.body.ItemsData[0].id;
            console.log("___________")
            console.log(storedLenght);

          })
          .catch(error => {
            expect.fail(error);
          });
      });

      
      it('Delete-method,Should delete a item2 in searchtest', async function() 
      {
        this.timeout(3000);
        await chai.request(apiAddress)
        .delete('/items/delete/'+storedLenght)
        .auth('tester', 'testerpassword')
        .then(response => 
        {
          expect(response.status).to.equal(200);
            
        })
        .catch(error => 
          {
            expect.fail(error)
          })

      })


      it('GET-method: test search/location', async function() {
        this.timeout(3000);
        await chai.request(apiAddress)
          .get('/items/search/location/London,YK')
          .then(response => {
            //expect(response.status).to.equal(200);
            expect(response.body).to.be.a('object');
            expect(response.body).to.have.a.property('ItemsData');
            expect(response.body.ItemsData).to.be.a('array');
            //expect(response.body.ItemsData[0]).to.be.a('object');
            
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

            expect(response.body.ItemsData[0]).to.have.a.property('category') == 'London,YK';
          })
          .catch(error => {
            expect.fail(error)
          })
      })

      it('GET-method: test search/dateofposting', async function() {
        this.timeout(3000);
        await chai.request(apiAddress)
          .get('/items/search/dateofposting/1591012800')
          .then(response => {
            //expect(response.status).to.equal(200);
            expect(response.body).to.be.a('object');
            expect(response.body).to.have.a.property('ItemsData');
            expect(response.body.ItemsData).to.be.a('array');
            expect(response.body.ItemsData[0]).to.be.a('object');
            //console.log(response.body)
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

            expect(response.body.ItemsData[0]).to.have.a.property('dateofposting') == "1591012800";
          })
          .catch(error => {
            expect.fail(error)
          })
      })
    
    


    })
  });