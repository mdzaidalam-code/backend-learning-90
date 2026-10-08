const express = require('express');
const router = express.Router();
const {getUsers, getUserById, createUser} = require('../controller/userController')

// Route chain for /api/v1/users
router.route('/')
 .get(getUsers)
 .post(createUser);                 

 // Route chain for /api/v1/users/:id
 router.route('/:id')
  .get(getUserById);

module.exports = router;