const xpError = require('../utils/error');

const validateName = (name) => {
  if (name.length < 3) {
    throw xpError(
      400,
      'username deve possuir no mínimo 8 caracteres',
    );
  }
};

// https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!emailRegex.test(email)) {
    throw xpError(
      400,
      'Favor informar um formato de email válido.',
    );
  }
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(password)) {
    throw xpError(
      400,
      'Favor informar uma senha com no mínimo 8 caracteres, um caracter especial e um número.',
    );
  }
};

const validateBallance = (ballance) => {
  if (ballance < 0 || typeof ballance !== 'number') {
    throw xpError(
      400,
      '"saldo" deve ser um número maior ou igual a 0',
    );
  }
};

const validateNewUser = (req, _res, next) => {
  const {
    email, password, userName, ballance,
  } = req.body;
  if (!email || !password || !userName || !ballance) {
    throw xpError(400, 'Favor informar todos os campos para criação do usuário.');
  }
  validateName(userName);
  validateEmail(email);
  validatePassword(password);
  validateBallance(ballance);
  return next();
};

module.exports = validateNewUser;
