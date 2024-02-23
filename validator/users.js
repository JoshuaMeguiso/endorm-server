const isEmpty = require("./is-empty.js");

module.exports.validateInput = function validateInput(data) {
  let errors = {};

  if (isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (isEmpty(data.motorcycle_brand)) {
    errors.motorcycle_brand = "Motorcycle Branch is required";
  }

  if (isEmpty(data.motorcycle_name)) {
    errors.motorcycle_name = "Motorcycle Branch is required";
  }

  if (isEmpty(data.plate_no)) {
    errors.plate_no = "Plate Number is required";
  }

  if (isEmpty(data.contact_no)) {
    errors.contact_no = "Contact Number is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
