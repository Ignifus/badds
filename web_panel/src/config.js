import validate from 'validate.js'

// Validators
validate.validators.presence.message = '^El campo es requerido';

validate.validators.length.tooShort = (value, field, option) => {
  return `^Al menos ${option.minimum} caracteres`;
};

validate.validators.format.message = '^El campo no es valido';

validate.validators.numericality.notLessThan = (value, field, option) => {
  return `^Debe se menor a ${option.lessThan}`;
};

validate.validators.numericality.notGreaterThan = (value, field, option) => {
  return `^Debe se mayor a ${option.greaterThan}`;
};
