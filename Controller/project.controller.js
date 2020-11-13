var ProjectService = require('../Services/project.services');
var IssuesService = require('../Services/issues.services');

exports.createProject = async (req, res) => {
  
    let project = await ProjectService.getProject({ slug: req.body.slug });
    if (project) return res.status(400).send("Project already registered");

    project = await ProjectService.createProject({
        name: req.body.name,
        slug: req.body.slug.toUpperCase(),
        description: req.body.description,
    });
    
    res.status(200).json({
      _id: project._id,
      name: project.name,
      slug: project.slug,
      message:"Project created Success"
    });
};

exports.getProjects = async (req,res)=>{
    const projectsList = await ProjectService.getProjects(); 
 
    if(projectsList.length > 0){
       res.status(200).json({
         projectsList: projectsList
       });
    } 
    else {
     res.status(400).json({
       message: "No Project found in MongoDB"
     });
    }
};

exports.getProjectsBySlug = async (req,res)=>{
    const {slug} = req.params
    console.log("req.params.slug",slug);
  
    const project = await ProjectService.getProject({slug});
  
    if(project){
      res.status(200).json({
        projectData: project
      });
    }else{
      res.status(400).json({
        message: "Project not found in MongoDB agint this slug = "+slug
      });
    }
  
};

exports.createIssuesOfProjects = async (req,res)=> {
    const {slug} = req.params
    console.log("req.params.slug",slug);
  
    const project = await ProjectService.getProject({slug});
    const issues = await IssuesService.getIssueByProjectID({project_id:project._id});
  
    if(project){
      
      const issueNumber = slug+"-"+(issues.length+1);
      console.log(issueNumber);
      const issue = await IssuesService.createIssue({
        number:issueNumber,
        title:req.body.title,
        description:req.body.description,
        status:"open",
        projectId:project._id
      });
     
      res.status(200).json({
        _id: issue._id,
        issue_number: issue.number,
        title: issue.title,
        message:"Issue created Success"
      });
      
    }else{
      res.status(400).json({
        message: "Project not found in MongoDB agint this slug = "+slug+" can not add issue"
      });
    }
  
  };

