var express = require('express');
var UserRouter = express.Router();

var UserController = require('../Controller/user.controller');

UserRouter.post("/", UserController.createUser);

UserRouter.get('/', UserController.getUser);

UserRouter.get('/:email',UserController.getUserByEmail);


module.exports = UserRouter;