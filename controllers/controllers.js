const user = require('../DB/UserSchema');
const path = require('path');

// Serve static files from the build directory
function homepage(req,res)
{
res.status(200).send('Welcome to the homepage');
}

async function userDetails(req,res)
{
    const name=req.query.user;
    const user_details=await user.findOne({name});
    res.status(200).json(user_details);
}

async function getUser(req,res)
{
    const all_user=await user.find({});
    res.status(200).json(all_user);
}

async function deleteUser(req,res)
{
    const name=req.query.user;
    const status=await user.deleteOne({name});
    console.log(status);
    if(status.deletedCount===1)
    {
    res.status(200).json({message:`${name} Deleted Sucessfully`});
    }
    else
    {
    res.status(201).json({message:`User Not Present`});    
    }
}

async function updateUser(req,res)
{
const name=req.params.id;
const param=req.params.param;
const user_data=await user.findOne({name});
const id=user_data._id.toString();
if(param==='name')
{
const newdata=req.params.input;
console.log(newdata);
const updatedUser={name:newdata,email:user_data.email,age:user_data.age,password:user_data.password,designation:user_data.designation};
console.log(updatedUser);
const updatedUserDoc = await user.findByIdAndUpdate(id, updatedUser, {
new: true, // Return the updated user data
});
if (!updatedUserDoc) {
    res.status(204).json({message:'Updation Failed'});
}
else{
    res.status(200).json({message:'Updation Done'});
}
}
//email
else
if(param==='email')
{
const newdata=req.params.input;
const updatedUser={name:user_data.name,email:newdata,age:user_data.age,password:user_data.password,designation:user_data.designation};
const updatedUserDoc = await user.findByIdAndUpdate(id, updatedUser, {
new: true, // Return the updated user data
});
if (!updatedUserDoc) {
    res.status(204).json({message:'Updation Failed'});
}
else{
    res.status(200).json({message:'Updation Done'});
}
}
//
if(param==='age')
{
const newdata=req.params.input;
const updatedUser={name:user_data.name,email:user_data.email,age:newdata,password:user_data.password,designation:user_data.designation};
const updatedUserDoc = await user.findByIdAndUpdate(id, updatedUser, {
new: true, // Return the updated user data
});
if (!updatedUserDoc) {
    res.status(204).json({message:'Updation Failed'});
}
else{
    res.status(200).json({message:'Updation Done'});
}
}


}


async function createUser(req,res)
{
    const{name,email,age,password,designation}=req.body;

    const user_p=await user.findOne({email});
    if(user_p){
        res.status(400).json({message:'User already exist'})
    }
    else{
        const contact=await user({name,email,age,password,designation});
        const status=await contact.save();
        if(status)
        {
        res.status(201).json({message:`User Created Successfully ${contact}`})
        }
        else
        {
            res.status(400).json({message:`User Cannot be saved in DB`})
        }
    }
}


module.exports={
    homepage,getUser,createUser,deleteUser,userDetails,updateUser
}