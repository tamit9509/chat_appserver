const router = require('express').Router();
const validate = require('../../validation/v1/data.validation');
const controller = require('../../controllers');


router.post('/login', controller.login);
router.post('/signup', validate.validate('signup'), controller.signup);

module.exports = router;