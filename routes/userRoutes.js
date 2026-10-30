const express = require('express');
const router = express.Router();
const {getUsers, getUserById, createUser,updateUser,deleteUser,loginUser} = require('../controller/userController')

router.post('/login',loginUser) // or can be written as router.route('/login').post(loginuser)

// Route chain for /api/v1/users
router.route('/')
 .get(getUsers)
 .post(createUser);                 

 // Route chain for /api/v1/users/:id
 router.route('/:id').
  get(getUserById).
  put(updateUser).
  delete(deleteUser);

module.exports = router;