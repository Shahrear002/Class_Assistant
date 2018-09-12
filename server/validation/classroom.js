const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateClassroomInput(data) {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : '';

	if (!Validator.isLength(data.name, { min: 6, max: 25 })) {
		errors.name = 'Classroom Name must be between 6 and 25 characters';
	}

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Classroom Name field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
