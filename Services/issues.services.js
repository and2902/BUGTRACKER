var {Issues} = require('../Model/issues.model');

exports.getIssueByProjectID = async function (query) {
    
    const issues = await Issues.find(query);
    
    return issues;

};

exports.createIssue = exports.createProject =  async function (query) {
    
    const issue = new Issues(query);

    return await Issues.create(issue);
}

exports.getCommentsOnIssue = async function (query) {
    console.log(query);
    const issues = await Issues.find(query).populate('commentslist');
    console.log(issues);

    return issues;
};

exports.getCommentOnIssue = async function (query) {
    console.log(query);
    const issues = await Issues.findOne(query).populate('commentslist');
    console.log(issues);

    return issues;
};

exports.getallIsuue = async function () {
    
    const issues = await Issues.find().populate('commentslist');

    return issues

   
};