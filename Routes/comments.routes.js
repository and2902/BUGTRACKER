var express = require('express');
var CommentsRouter = express.Router();

var CommentsController = require('../Controller/coments.controller');

CommentsRouter.get('/',CommentsController.getAllComments);
  
CommentsRouter.get('/:email',CommentsController.getCommentsByUser);


module.exports = CommentsRouter;