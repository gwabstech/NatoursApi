const express = require('express');
const router = express.Router();

const getUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not implemented',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not implemented',
  });
};

const getUserById = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not implemented',
  });
};

const updateUserById = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not implemented',
  });
};

const deleteUserById = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not implemented',
  });
};

// users routes
router.route('/').get(getUsers).post(createUser);

// user by id routes
router
  .route('/:id')
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = router;
