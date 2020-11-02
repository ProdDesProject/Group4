const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../server');
//var request = require('supertest');

const expect = chai.expect;
const apiAddress = 'http://localhost:3000';

describe('User operations', function () {

    before(function () {
        server.start();
    });

    after(function () {
        server.stop();
    })

    var token = null;

    describe('Register user', function () {
        it('Should add a new user to the database', async function () {
            await chai.request(apiAddress)
                .post('/users/create')
                .send({
                    username: "test",
                    password: "testpassword",
                    email: "email"
                })
                .then(response => {
                    expect(response.status).to.equal(201);
                })
                .catch(error => {
                    expect.fail(error)
                })
        })
        it('Should NOT add a new user to the database because the username already exists', async function () {
            await chai.request(apiAddress)
                .post('/users/create')
                .send({
                    username: "tester",
                    password: "testerpassword",
                    email: "email@email.com"
                })
                .then(response => {
                    expect(response.status).to.equal(409);
                })
                .catch(error => {
                    expect.fail(error)
                })
        })
        it('Should NOT add a new user to the database because no email was given', async function () {
            await chai.request(apiAddress)
                .post('/users/create')
                .send({
                    username: "tester",
                    password: "testerpassword",
                    email: ""
                })
                .then(response => {
                    expect(response.status).to.equal(400);
                })
                .catch(error => {
                    expect.fail(error)
                })
        })
    })

    describe('Login a user', function () {

        it('Should login if the correct credentials been given', async function () {
            await chai.request(apiAddress)
                .post('/login')
                .auth("tester", "testerpassword")
                .then(response => {
                    expect(response.status).to.equal(200);
                    expect(response.body.token)
                })
                .catch(error => {
                    expect.fail(error)
                })
        })
        it('Should not login if the wrong credentials been given', async function () {
            await chai.request(apiAddress)
                .post('/login')
                .auth("tester", "wrongpassword")
                .then(response => {
                    expect(response.status).to.equal(401);
                })
                .catch(error => {
                    expect.fail(error)
                })
        })

        it('Should login if the correct credentials been given', async function () {
            await chai.request(apiAddress)
                .post('/login')
                .auth("tester", "testerpassword")
                .then(response => {
                    token = response.body.token;
                });

        })

    })


});

describe('Item operations', function () {

    before(function () {
        server.start();
    });

    after(function () {
        server.stop();
    })

    var token = null;

    describe('Create an item', function () {

        // login for token
        it('Should login if the correct credentials been given', async function () {
            await chai.request(apiAddress)
                .post('/login')
                .auth("tester", "testerpassword")
                .then(response => {
                    token = response.body.token;
                })
                .catch(error => {
                    expect.fail(error)
                })

        })
        it('Should add a new item to the database', async function () {
            await chai.request(apiAddress)
                .post('/items/create')
                .set({
                    Authorization: `Bearer ${token}`
                })
                .send({
                    userId: "2",
                    title: "Testitem 1",
                    description: "This is an example item",
                    category: "electronic",
                    locationCountry: "Finland",
                    locationCity: "Oulu",
                    askingPrice: 77.77,
                    deliveryType: "pickup",
                    sellerName: "Jonas",
                    sellerEmail: "jonas@gmail.com"
                })
                .then(response => {
                    expect(response.status).to.equal(201);
                })
                .catch(error => {
                    expect.fail(error)
                })
        })
        it('Should NOT add a new item to the database because the title parameter is missing', async function () {
            await chai.request(apiAddress)

                .post('/items/create')
                .set({
                    Authorization: `Bearer ${token}`
                })
                .send({
                    description: "This is an example item",
                    category: "electronic",
                    locationCountry: "Finland",
                    locationCity: "Oulu",
                    askingPrice: 77.77,
                    deliveryType: "pickup",
                    sellerName: "Jonas",
                    sellerEmail: "jonas@gmail.com"
                })
                .then(response => {
                    expect(response.status).to.equal(400);
                })
                .catch(error => {
                    expect.fail(error)
                })
        })
        it('Should NOT add a new item because no bearer token is provided', async function () {
            await chai.request(apiAddress)
                .post('/items/create')
                // .set('Authorization', 'bearer ' + auth.token)
                .send({
                    description: "This is an example item",
                    category: "electronic",
                    locationCountry: "Finland",
                    locationCity: "Oulu",
                    askingPrice: 77.77,
                    deliveryType: "pickup",
                    sellerName: "Jonas",
                    sellerEmail: "jonas@gmail.com"
                })
                .then(response => {
                    expect(response.status).to.equal(401);
                })
                .catch(error => {
                    expect.fail(error)
                })
        })
    })

    describe('Search for items', function () {
        it('Should search for items by category', async function () {
            await chai.request(apiAddress)
                .get('/items/search/category/animals')
                .then(response => {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.be.instanceof(Array);
                })
                .catch(error => {
                    expect.fail(error)
                })
        })
        it('Should search for items by locationCountry', async function () {
            await chai.request(apiAddress)
                .get('/items/search/locationCountry/Finland')
                .then(response => {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.be.instanceof(Array);
                })
                .catch(error => {
                    expect.fail(error)
                })
        })
        it('Should search for items by locationCity', async function () {
            await chai.request(apiAddress)
                .get('/items/search/locationCity/Oulu')
                .then(response => {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.be.instanceof(Array);
                })
                .catch(error => {
                    expect.fail(error)
                })
        })
        it('Should search for items by date', async function () {
            await chai.request(apiAddress)
                .get('/items/search/date/17062020')
                .then(response => {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.be.instanceof(Array);
                })
                .catch(error => {
                    expect.fail(error)
                })
        })
        it('Should give an error because date format is invalid', async function () {
            await chai.request(apiAddress)
                .get('/items/search/date/1706202')
                .then(response => {
                    expect(response.status).to.equal(400);
                })
                .catch(error => {
                    expect.fail(error)
                })
        })
        it('Should search for items by parameter categoryyy but response should be 400 because the parameter categoryyy does not exist', async function () {
            await chai.request(apiAddress)
                .get('/items/search/categoryyy/animals')
                .then(response => {
                    expect(response.status).to.equal(404);
                })
                .catch(error => {
                    expect.fail(error)
                })
        })
        it('Should search for items by category drunkpeople should return 400 because the category does not exist', async function () {
            await chai.request(apiAddress)
                .get('/items/search/category/drunkpeople')
                .then(response => {
                    expect(response.status).to.equal(400);
                })
                .catch(error => {
                    expect.fail(error)
                })
        })
    })

    describe('Should edit an existing item', function () {
        it('successfully edit an item and return status 200', async function () {
            await chai.request(apiAddress)
                .put('/items/2')
                .set({
                    Authorization: `Bearer ${token}`
                })
                .send({
                    title: "test2",
                    description: "This is an example item2",
                    category: "electronic2",
                    locationCountry: "Finland2",
                    locationCity: "Oulu2",
                    askingPrice: 77.72,
                    deliveryType: "shipping",
                    sellerName: "Jonas2",
                    sellerEmail: "jonas@gmail.com2"
                })
                .then(response => {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.be.a('object');
                    expect(response.body).to.have.a.property('itemId');
                    expect(response.body).to.have.a.property('title');
                    expect(response.body).to.have.a.property('description');
                    expect(response.body).to.have.a.property('category');
                    expect(response.body).to.have.a.property('askingPrice');
                    expect(response.body).to.have.a.property('locationCity');
                    expect(response.body).to.have.a.property('locationCountry');
                    expect(response.body).to.have.a.property('deliveryType');
                    expect(response.body.deliveryType).to.equal('shipping');
                    expect(response.body).to.have.a.property('sellerName');
                    expect(response.body).to.have.a.property('sellerEmail');
                })
                .catch(error => {
                    expect.fail(error)
                })
        })
        it('Should not edit the item because the title is not provided', async function () {
            await chai.request(apiAddress)
                .put('/items/2')
                .set({
                    Authorization: `Bearer ${token}`
                })
                .send({
                    description: "This is an example item2",
                    category: "electronic2",
                    locationCountry: "Finland2",
                    locationCity: "Oulu2",
                    askingPrice: 77.72,
                    deliveryType: "pickup2",
                    sellerName: "Jonas2",
                    sellerEmail: "jonas@gmail.com2"
                })
                .then(response => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.be.instanceof(Object);
                })
                .catch(error => {
                    expect.fail(error)
                })
        })
        it('Should not edit the item because the item with id 200 is not existing', async function () {
            await chai.request(apiAddress)
                .put('/items/200')
                .set({
                    Authorization: `Bearer ${token}`
                })
                .send({
                    description: "This is an example item2",
                    category: "electronic2",
                    locationCountry: "Finland2",
                    locationCity: "Oulu2",
                    askingPrice: 77.72,
                    deliveryType: "pickup2",
                    sellerName: "Jonas2",
                    sellerEmail: "jonas@gmail.com2"
                })
                .then(response => {
                    expect(response.status).to.equal(404);
                })
                .catch(error => {
                    expect.fail(error)
                })
        })
        it('Should throw an error because no token is provided', async function () {
            await chai.request(apiAddress)
                .put('/items/200')
                // .set('Authorization', 'bearer ' + auth.token)
                .send({
                    description: "This is an example item2",
                    category: "electronic2",
                    locationCountry: "Finland2",
                    locationCity: "Oulu2",
                    askingPrice: 77.72,
                    deliveryType: "pickup2",
                    sellerName: "Jonas2",
                    sellerEmail: "jonas@gmail.com2"
                })
                .then(response => {
                    expect(response.status).to.equal(401);
                    expect(response.body).to.be.instanceof(Object);
                })
                .catch(error => {
                    expect.fail(error)
                })
        })


    })

    describe('Delete an item', function () {
        it('Should delete the item', async function () {
            await chai.request(apiAddress)
                .delete('/items/2')
                .set({
                    Authorization: `Bearer ${token}`
                })
                .then(response => {
                    expect(response.status).to.equal(200);
                })
                .catch(error => {
                    expect.fail(error)
                })
        })
        it('Should not delete the item because no token provided', async function () {
            await chai.request(apiAddress)
                .delete('/items/2')
                // .set('Authorization', 'bearer ' + token)
                .then(response => {
                    expect(response.status).to.equal(401);
                })
                .catch(error => {
                    expect.fail(error)
                })
        })
        it('Should not delete the item because no item with that id exists', async function () {
            await chai.request(apiAddress)
                .delete('/items/200')
                .set({
                    Authorization: `Bearer ${token}`
                })
                .then(response => {
                    expect(response.status).to.equal(404);
                })
                .catch(error => {
                    expect.fail(error)
                })
        })


    })


});