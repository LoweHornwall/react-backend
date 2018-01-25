process.env.NODE_ENV = "test";

var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../app");
var knex = require("../db/knex");

var should = chai.should();
chai.use(chaiHttp);

describe("Quizzes routes", () => {
  beforeEach(done => {
    knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run())
    .then(() => done());
  });

  afterEach(done => {
    knex.migrate.rollback()
    .then(() => done());
  });

  describe("Get some quizzes", () => {
    it("should get some quizzes", done => {
      chai.request(server)
        .get("/quizzes/page/1")
        .end(function(req, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("Success");
          res.body.should.have.property("response");
          res.body.response.results.length.should.equal(2);
          done();
       });
    });
  });

  describe("Get the quiz called \"Games vol.2\"", () => {
    it("should get the quiz called \"Games vol.2\"", done => {
      chai.request(server)
        .get("/quizzes/show/Games%20vol.2")
        .end((req, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("Success");
          res.body.should.have.property("response");
          res.body.response[0].name.should.equal("Games vol.2")
          done();
        })
    });
  });
});