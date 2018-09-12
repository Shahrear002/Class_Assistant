const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateJoinclassInput(data) {
	let errors = {};

	data.enrollmentCode = !isEmpty(data.enrollmentCode)
		? data.enrollmentCode
		: '';

	if (Validator.isEmpty(data.enrollmentCode)) {
		errors.enrollmentCode = 'Classroom code field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
