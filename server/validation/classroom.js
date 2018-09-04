const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateClassroomInput(data) {
	let errors = {};

	data.text = !isEmpty(data.text) ? data.text : '';

	if (!Validator.isLength(data.text, { min: 6, max: 50 })) {
		errors.text = 'Classroom name must be between 6 and 50 characters';
	}

	if (Validator.isEmpty(data.text)) {
		errors.text = 'Classroom name field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
