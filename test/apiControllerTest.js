var app = require('../app');
var request = require('supertest');
var expect = require('chai').expect;


describe('Register api ', () => {
    it('Should not accept duplicate email Id', (done) => {
        request(app)
            .post('/user/register')
            .send({
                username: 'Siddhu4',
                firstName: 'Siddhartha',
                lastName: 'Tiwary',
                email: 'siddhartha.tiwary4@outlook.com',
                password: 'test12345'

            })
            .set('Accept', 'application/json')
            .expect(500)
            .end((err, res) => {

                done();
            })
    });
    it('Should not accept duplicate User Id', (done) => {
        request(app)
            .post('/user/register')
            .send({
                username: 'Siddhu4',
                firstName: 'Siddhartha',
                lastName: 'Tiwary',
                email: 'siddhartha.tiwary4@outlook.com',
                password: 'test12345'

            })
            .set('Accept', 'application/json')
            .expect(500)
            .end((err, res) => {

                done();
            })
    });
    it('Should Contain all parameter', (done) => {
        request(app)
            .post('/user/register')
            .send({
                username: 'Siddhu4',
                lastName: 'Tiwary',
                email: 'siddhartha.tiwary4@outlook.com',
                password: 'test12345'

            })
            .set('Accept', 'application/json')
            .expect(400)
            .end((err, res) => {

                done();
            })
    });

});

describe('Login Api', () => {
    it('Should not return 401 for incorrect credentials ', (done) => {
        request(app)
            .post('/user/register')
            .send({
                username: 'Siddhu4',
                password: 'test12345dsadasdas'

            })
            .set('Accept', 'application/json')
            .expect(401)
            .end((err, res) => {

                done();
            })

    });
    it('Should not return 401 if request model does not contain user id or password ', (done) => {
        request(app)
            .post('/user/register')
            .send({
                username: 'Siddhu4',
                password: 'test12345dsadasdas'

            })
            .set('Accept', 'application/json')
            .expect(401)
            .end((err, res) => {

                done();
            })

    })
    it('Should return user info and token if  credentials are correct', (done) => {
        request(app)
            .post('/user/register')
            .send({
                username: 'Siddhu4',
                password: 'test12345'

            })
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('token');
                expect(res.body).to.have.deep.property('user.email', 'siddhartha.tiwary4@outlook.com');
                done();
            })

    })
});