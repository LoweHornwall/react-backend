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

  describe("Get all quizzes", () => {
    it("should get all quizzes", done => {
      chai.request(server)
      .get("/quizzes")
      .end(function(req, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("Success");
        res.body.response.length.should.equal(3);
        done();
      });
    });
  });

});