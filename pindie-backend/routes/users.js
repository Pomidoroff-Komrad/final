const usersRouter = require('express').Router();

const {findAllUsers, createUser, findUserById, updateUser, checkEmptyNameAndEmail, deleteUser, hashPassword, checkIsUserExists} = require('../middlewares/users');
const {sendAllUsers, sendCreatedUser, sendUpdatedUser, sendDeleteUser, sendMe} = require('../controllers/users');
const { checkAuth } = require("../middlewares/auth.js");


usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.post("/users", checkEmptyNameAndEmail, findAllUsers, checkIsUserExists, hashPassword, checkAuth, createUser, sendCreatedUser);
usersRouter.put("/users/:id", checkEmptyNameAndEmail, findUserById, checkAuth, updateUser, sendUpdatedUser);
usersRouter.delete('/users/:id', deleteUser, sendDeleteUser)
usersRouter.get("/me", checkAuth, sendMe);

module.exports = usersRouter;
  