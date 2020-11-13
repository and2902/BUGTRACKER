var IssuesService = require('../Services/issues.services');
var CommentsService = require('../Services/comments.services');
var UserService = require('../Services/user.services');
var ProjectService = require('../Services/project.services');

exports.createIssue = async (req,res)=> {
    const {issuesNumber} = req.params
    console.log("req.params.issuesNumber",issuesNumber);
  
    const issue = await IssuesService.getIssueByProjectID({number:issuesNumber});
    const user = await UserService.getOneByEmail({email:req.body.author});
  
    if(issue && user){
        const comment =await CommentsService.createComment({
            text:req.body.text,
            author:user._id
         });
      
      console.log("issue",issue)
  
      issue[0].commentslist.push(comment._id);
  
      await issue[0].save();
  
      res.status(200).json({
        _id: comment._id,
        text: comment.text,
        message:"Comment create Success"
        });
    }else{
        res.status(400).json({
          message: "Issue or User not found in MongoDB so can not add comment"
        });
      }
};

exports.getIssueComments = async (req,res)=>{
    const {issuesNumber} = req.params
    console.log("req.params.issuesNumber",issuesNumber);
  
    const issue = await IssuesService.getCommentOnIssue({number:issuesNumber});
    if(issue){
   
       res.status(200).json({
        commentsList:issue.commentslist
       });
       
     }else{
       res.status(400).json({
         message: "Issue not found in MongoDB so can not get comment"
       });
     } 
};

exports.getIssuebyCommentsByProject = async (req,res)=>{
    const {issuesNumber,commentid} = req.params
    console.log("req.params.issuesNumber",issuesNumber,"req.params.commentid",commentid);
  
    const issue = await IssuesService.getCommentOnIssue({number:issuesNumber});
    if(issue){
        console.log(Number(commentid) >= issue.commentslist.length);
       if(Number(commentid)-1 < issue.commentslist.length ){
        res.status(200).json({
          commentsList:issue.commentslist[Number(commentid)-1]
         });
       }else{
        res.status(400).json({
          message: "Comments not found in MongoDB against commentid ="+commentid
        });
       }  
     }else{
       res.status(400).json({
         message: "Issue not found in MongoDB so can not get comment"
       });
     } 
};

exports.getAllIssues = async (req,res)=>{
  
    const issueslist = await IssuesService.getallIsuue();
    if(issueslist.length>0){
   
       res.status(200).json({
        issuesList:issueslist
       });
       
     }else{
       res.status(400).json({
         message: "Issue not found in MongoDB "
       });
     }
};

exports.getIssueByIssueNumber = async (req,res)=>{
    const {issuesNumber} = req.params
    console.log("req.params.issuesNumber",issuesNumber);
  
    const issue = await IssuesService.getCommentOnIssue({number:issuesNumber});
    if(issue){
   
       res.status(200).json({
        issueData:issue
       });
       
     }else{
       res.status(400).json({
         message: "Issue not found in MongoDB "
       });
     } 
};

exports.getIssueOfProject = async (req,res)=>{
    const {slug} = req.params
    console.log("req.params.slug",slug);
    const data = {slug:slug};
    console.log("Data",data);
    const project = await ProjectService.getProject(data);
    console.log(project._id)
    const issuesList = await IssuesService.getCommentsOnIssue({projectId:project._id});
    if(project && issuesList.length>0){
      res.status(200).json({
        issuesList:issuesList
      })
    }else{
      res.status(400).json({
        message: "Project not found in MongoDB so can not get issue"
      });
    }
  
};

exports.updateIssueStatus = async (req,res)=>{
    const {issuesNumber,statusparm,slug} = req.params
  
    if(slug !== issuesNumber.substring(0,issuesNumber.length-2)){
      res.status(400).json({
        message: "Issue not related to Project "
      });
    }
  
    console.log("req.params.issuesNumber",issuesNumber);
  
    const issue = await IssuesService.getIssueByProjectID({number:issuesNumber});
    if(issue){
  
      issue[0].status=statusparm;
      console.log(issue[0]);
      await issue[0].save();
      res.status(200).json({
        message:"Status update success"
       });
       
     }else{
       res.status(400).json({
         message: "Issue not found in MongoDB "
       });
     } 
};