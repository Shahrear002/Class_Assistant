const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.institute = !isEmpty(data.institute) ? data.institute : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  // data.to = !isEmpty(data.to) ? data.to : '';

  if (Validator.isEmpty(data.institute)) {
    errors.institute = 'Institute field is required';
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Fieldofstudy date field is required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'from date field is required';
  }

  // if (Validator.isEmpty(data.to)) {
  //   errors.to = 'to date field is required';
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
