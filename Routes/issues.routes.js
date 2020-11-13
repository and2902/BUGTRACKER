var express = require('express');
var IssuesRouter = express.Router();

var IssuesController = require('../Controller/issues.controller');

IssuesRouter.post('/:issuesNumber/comments',IssuesController.createIssue);

IssuesRouter.get('/:issuesNumber/comments', IssuesController.getIssueComments);
  
IssuesRouter.get('/:issuesNumber/comments/:commentid', IssuesController.getIssuebyCommentsByProject);
  
IssuesRouter.get('/',IssuesController.getAllIssues);
  
IssuesRouter.get('/:issuesNumber', IssuesController.getIssueByIssueNumber);



module.exports = IssuesRouter;