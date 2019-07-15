'use strict';

const express = require('express'),
      router = express.Router();

const persons = require('../controllers/person');

router.route('/persons')
    .get(persons.getPersons)
    .post(persons.addPerson);


router.route('/persons/:id')
    .get(persons.getPerson)
    .put(persons.updatePerson)
    .delete(persons.deletePerson);

module.exports = router;