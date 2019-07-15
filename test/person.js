process.env.NODE_ENV = 'test';

const chai = require('chai'),
      chaiHttp = require('chai-http'),
      chaiLike = require('chai-like'),
      chaiThings = require('chai-things');

const apiKey = require('../config').apiKey;
const Person = require('../models/person');
const app = require('../app');

chai.should();
chai.use(chaiHttp);
chai.use(chaiLike);
chai.use(chaiThings);

const newPerson = { firstName: 'John', lastName: "Donn", age: 20, address: "address" };
const persons = [
  { firstName: 'firstName1', lastName: "lastName1", age: 1, address: "address1" },
  { firstName: 'firstName2', lastName: "lastName2", age: 2, address: "address2" },
  { firstName: 'firstName3', lastName: "lastName3", age: 3, address: "address3" },
];

const toJSON = obj => JSON.parse(JSON.stringify(obj));

const request = (query='', method='get') =>
    chai.request(app)
        [method]('/api/v1/persons/' + query)
        .set('Authorization', apiKey);

describe('Persons', () => {
  beforeEach((done) => {
    Person.deleteMany({}, (err) => {
      persons.forEach(p => new Person(p).save());
      done();
    });
  });

  describe('/GET persons', () => {
    it('should GET all persons', (done) => {
      request().end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(persons.length);
        done();
      });
    });

    it('should GET all persons with firstName equal to firstName1', (done) => {
      request('?name=firstName1').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        res.body.should.contain.something.like(persons[0]);
        done();
      });
    });

    it('should GET all persons with age in range [1,2]', (done) => {
      request('?minage=1&maxage=2').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(2);
        res.body.should.contain.something.like(persons[0]);
        res.body.should.contain.something.like(persons[1]);
        done();
      });
    })
  });

  describe('/POST persons', () => {
    it('should POST a person', (done) => {
      request('', 'post')
          .send(newPerson)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.like(newPerson);
            done();
          });
    });

    it('should not POST a person without firstName attribute', (done) => {
      const {firstName, ...person} = newPerson;
      request('', 'post')
          .send(person)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            done();
          });
    });
  });

  describe('/GET person/:id', () => {
    it('should GET a person by the given id', (done) => {
      new Person(newPerson).save((err, person) => {
        request(person.id).end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.be.deep.equal(toJSON(person._doc));
          done();
        });
      });
    });
  });

  describe('/PUT person/:id', () => {
    it('should UPDATE a person by the given id', (done) => {
      const updatedPerson = Object.assign(newPerson, { age: 21 });
      new Person(newPerson).save((err, person) => {
        request(person.id, 'put')
            .send(updatedPerson)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('age').eql(21);
              done();
            });
      });
    });
  });

  describe('/DELETE person/:id', () => {
    it('should DELETE a person by the given id', (done) => {
      new Person(newPerson).save((err, person) => {
        request(person.id, 'delete').end((err, res) => {
          res.should.have.status(204);
          done();
        });
      });
    });

    it('should not DELETE a person by non-existent given id', (done) => {
      request('non-existent id', 'delete')
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            done();
          });
    });
  });
});