const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');

// users routes
router.route('/').get(userController.getUsers).post(userController.createUser);

// user by id routes
router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

module.exports = router;
