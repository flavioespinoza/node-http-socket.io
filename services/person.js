'use strict';

const { InternalError, ValidationError, NotFoundError } = require('../util/errors');
const Person = require('../models/person');

exports.getPersons = async (name, minage, maxage) => {
  const query = {};
  const age = {};

  if (name != null) {
    query.firstName = name;
  }
  if (minage != null) {
    age.$gte = minage;
  }
  if (maxage != null) {
    age.$lte = maxage;
  }
  if (Object.keys(age).length > 0) {
    query.age = age;
  }

  try {
    return await Person.find(query);
  } catch (e) {
    if (e.name === 'CastError') {
      throw new ValidationError(e, e.message);
    }
    throw new InternalError(e);
  }
};

exports.addPerson = async (person) => {
  try {
    return await new Person(person).save(person);
  } catch(e) {
    if (e.name === 'CastError' || e.name === 'ValidationError') {
      throw new ValidationError(e, e.message)
    }
    throw new InternalError(e);
  }
};

exports.getPerson = async (id) => {
  try {
    return await Person.findById(id);
  } catch (e) {
    if (e.name === 'CastError') {
      throw new ValidationError(e, e.message)
    }
    throw new InternalError(e);
  }
};

exports.updatePerson = async (id, person) => {
  try {
    return await Person.findOneAndUpdate({_id: id}, person, {new: true});
  } catch (e) {
    if (e.name === 'CastError') {
      throw new ValidationError(e, e.message)
    }
    throw new InternalError(e);
  }
};

exports.deletePerson = async (id) => {
  let result;
  try {
    result = await Person.deleteOne({_id: id});
  } catch (e) {
    if (e.name === 'CastError') {
      throw new ValidationError(e, e.message)
    }
    throw new InternalError(e);
  }

  if (result.deletedCount === 0) {
    throw new NotFoundError(null, 'Resource not found');
  }
};