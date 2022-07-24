const validateName = (name) => {
  if (name.length < 3) {
    const error = {
      status: 400,
      message: 'username deve possuir no mínimo 8 caracteres',
    };
    throw error;
  }
};

// https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!emailRegex.test(email)) {
    const error = {
      status: 400,
      message: 'Favor informar um formato de email válido.',
    };
    throw error;
  }
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(password)) {
    const error = {
      status: 400,
      message: 'Favor informar uma senha com no mínimo 8 caracteres, um caracter especial e um número.',
    };
    throw error;
  }
};

const validateBallance = (ballance) => {
  if (ballance < 0 || typeof ballance !== 'number') {
    const error = {
      status: 400,
      message: '"saldo" deve ser um número maior ou igual a 0',
    };
    throw error;
  }
};

const validateNewUser = (req, _res, next) => {
  const {
    email, password, userName, ballance,
  } = req.body;
  if (!email || !password || !userName || !ballance) {
    const error = { status: 400, message: 'Favor informar todos os campos para criação do usuário.' };
    throw error;
  }
  validateName(userName);
  validateEmail(email);
  validatePassword(password);
  validateBallance(ballance);
  return next();
};

module.exports = validateNewUser;
