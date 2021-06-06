var chai = require('chai');
var testCase = require('mocha').describe;
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

testCase('/GET posts with userId & title', function(){
    it('it should GET post userId&title filtered', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts?userID=1&title=qui est esse')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

        it('it should GET two posts userId & two title filtered', (done) => {
            chai.request('https://jsonplaceholder.typicode.com')
                .get('/posts?userID=1&title=qui est esse&title=nesciunt quas odio')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

    it('it should GET empty list- reason:wrong userId', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts?userID=11&title=qui est esse')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('it should GET empty list- reason:wrong title', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts?userID=1&title=wrong title')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('it should GET empty list- reason:wrong title and wrong UserId', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts?userID=35&title=wrong title')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('it should GET four posts by title filtered', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts?userId=1&title_like=qui')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});