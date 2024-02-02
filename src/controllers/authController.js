const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const {haspassword,comparePassword} = require('../helper/authHelper');


const loginController = async (req,res) =>{
    const {email,password} = req.body;
    try {
        const {email,password}= req.body;
        if(!email || !password ){
            res.status(404).send({
                success:false,
                message:"invalid email and password"
                
            })
        }const user = await User.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
                
            })
        }
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:"password is invaild"
                
            })
    
        }
        const options = {
            expiresIn: '1h'
          };
        const token = await jwt.sign({_id : user._id},process.env.JWT_SECRET,options)  ;
        
    
        res.status(200).send({
            success:true,
            message:"login seccessfully",
            user : {
                name: user.name,
                email : user.email,
            },
            token
    
        });
        
      } catch (error) {
        console.log(error);
        res.status('500').send({
            success:false,
            masage:'error in login',
            error
        })
      }
    
    
    

}

   const registerController = async(req,res)=>{
    try {
      const {email,name,password,} = req.body;
      //validations
      if(!email){
          res.send({error:'email is requied'});
      }
      if(!password){
          res.send({error:'password is requied'});
      }
     
      
     
      //checkuser
      const existingUser = await User.findOne({email});
      //existing user
      if (existingUser){
          res.status(200).send({
              success:true,
              message:"already exisit please login"
          })
      }
      //hashpassword
      const hasedpasword = await haspassword(password);
      //save user
      const user = await new User({email,password:hasedpasword}).save();
      res.status(200).send({
          success:true,
          message:"user registed succes full",
          user
      });

    } catch (error) {
      console.log(error);
      res.status(500).send({
          success:false,
          masage:'error in message',
          error
      })
    }
};


module.exports = {loginController,registerController} ;