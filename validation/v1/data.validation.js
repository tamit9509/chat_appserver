const { check } = require('express-validator');

exports.validate = (method) => {
  switch (method) {
    case 'signup': {
      return [
        check('name').not().isEmpty().withMessage('Name is required'),
        check('email').isEmail().withMessage('Invalid email'),
        check('password').not().isEmpty().withMessage('Password is required')
      ]
    }
  }
}