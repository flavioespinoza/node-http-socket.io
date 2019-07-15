'use strict';

const service = require('../services/person');

exports.getPersons = async (req, res, next) => {
  const { name, minage, maxage } = req.query;

  try {
    const persons = await service.getPersons(name, minage, maxage);
    res.json(persons);
  } catch (e) {
    next(e);
  }
};

exports.addPerson = async (req, res, next) => {
  try {
    const person = await service.addPerson(req.body);
    res.status(201).json(person);
  } catch (e) {
    next(e);
  }
};

exports.getPerson = async (req, res, next) => {
  try {
    const person = await service.getPerson(req.params.id);
    res.json(person);
  } catch (e) {
    next(e);
  }
};

exports.updatePerson = async (req, res, next) => {
  try {
    const person = await service.updatePerson(req.params.id, req.body);
    res.json(person);
  } catch (e) {
    next(e);
  }
};

exports.deletePerson = async (req, res, next) => {
  try {
    await service.deletePerson(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};