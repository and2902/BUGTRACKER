var UserService = require('../Services/user.services');

exports.createUser = async (req, res) => {
  
    let user = await UserService.getOneByEmail({ email: req.body.email });
    console.log("user",user);
    if (user) return res.status(400).send("User already registered.");
  
    user = await UserService.createUser({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        role:req.body.role
    });
  
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message:"User created Success"
    });
};

exports.getUser = async (req,res)=>{

    const userslist = await UserService.getAllUsers();
 
    if(userslist.length > 0){
       res.status(200).json({
         usersList: userslist
       });
    } 
    else {
     res.status(400).json({
       message: "No user found in MongoDB"
     });
    }
 };

exports.getUserByEmail = async (req,res)=>{
    const {email} = req.params
    console.log("req.params.email",email);
  
    const user = await UserService.getOneByEmail({email});
  
    if(user){
      res.status(200).json({
        userdata: user
      });
    }else{
      res.status(400).json({
        message: "User not found in MongoDB agint this email ="+email
      });
    }
  
  };