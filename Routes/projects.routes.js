var express = require('express');
var ProjectRouter = express.Router();

var ProjectController = require('../Controller/project.controller');
var IssuesController = require('../Controller/issues.controller');

ProjectRouter.post("/", ProjectController.createProject);

ProjectRouter.get('/', ProjectController.getProjects);

ProjectRouter.get('/:slug',ProjectController.getProjectsBySlug);

ProjectRouter.post('/:slug/issues',ProjectController.createIssuesOfProjects);

ProjectRouter.get('/:slug/issues',IssuesController.getIssueOfProject);
  
ProjectRouter.put('/:slug/issues/:issuesNumber/:statusparm', IssuesController.updateIssueStatus);

module.exports = ProjectRouter;