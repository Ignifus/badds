import validate from 'validate.js'

validate.validators.presence.message = '^El campo es requerido';

validate.validators.length.tooShort = (value, field, option) => {
  return `^Al menos ${option.minimum} caracteres`;
};

validate.validators.format.message = '^El campo no es valido';
