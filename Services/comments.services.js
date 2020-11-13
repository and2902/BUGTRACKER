var {Comments} = require('../Model/comments.model');

exports.getComments =  async function (query) {
    
    const comments = await Comments.find().populate('author');
    
    return comments;

};


exports.getOneComment =  async function (query) {
    
    const comments = await Comments.find(query).populate('author');
    
    return comments;

  
};

exports.createComment = async function (query) {
    
    const comments = new Comments(query);
        
    return await comments.save();

          
    
}