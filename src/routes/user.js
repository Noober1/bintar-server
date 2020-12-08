const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');

router
  .route('/login')
  .post(controller.login)

router
  .route('/createAdmin')
  .post(controller.createAdmin)

module.exports = router;