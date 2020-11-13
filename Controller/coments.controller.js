var CommentsService = require('../Services/comments.services');
var UserService = require('../Services/user.services');

exports.getAllComments = async (req,res) => {
    const commentslist = await CommentsService.getComments();
  
    if(commentslist.length){
      res.status(200).json({
        commentsList: commentslist
      });
    }else{
      res.status(400).json({
        message: "Comments not found.."
      });
    }
  
};

exports.getCommentsByUser = async (req,res) => {
   
    const {email} = req.params
    console.log("req.params.email",email);
    const user = await UserService.getOneByEmail({email});  
  
    if(user){
      const commentslist = await CommentsService.getComments({author:user._id});
      res.status(200).json({
        commentsList: commentslist
      });
    }else{
      res.status(400).json({
        message: "Comments not found.."
      });
    }
};