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

exports._addPersonPromise = async (req) => {
	return new Promise(async (resolve) => {
		try {
			const person = await service.addPerson(req.body);
			resolve({
				success: true,
				status_code: 201,
				status_message: 'person_added',
				req_body: req.body,
				data: person
			})
		} catch (e) {
			const error = new Error(e)
			resolve({
				success: false,
				status_code: error.status_code, // 409 Conflict
				status_message: error.message, // person_already_exists
				req_body: req.body,
				data: {}
			})
		}
	})
}

exports.addPerson = async (req, res, next) => {
	try {
		const person = await this._addPersonPromise(req.body);
		if (person.success) {
			res.status(person.status_code).json(person);
		} else {
			res.status(person.status_code).json(person);
		}
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