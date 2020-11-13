var {Project} = require('../Model/project.model');

exports.createProject =  async function (query) {
    
    const project = new Project(query);
        
    return await project.save();

          
   
}

exports.getProject =  async function (query) {
    
    console.log(query);
    const project = await Project.findOne(query);
    console.log(project);

    return project;
}

exports.getProjects =  async function () {
    
    const project = await Project.find();

    return project;

   
}