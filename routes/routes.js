const express=require('express');
const router=express.Router();
//importing controllers
const{homepage,getUser,createUser,userDetails,deleteUser,updateUser}=require('../controllers/controllers.js')

//Defining route 
router.get('/users',getUser)
router.get('/details',userDetails)
router.post('/create',createUser)
router.delete('/delete',deleteUser)
router.put('/update/:id/:param/:input',updateUser)
router.get('*',homepage)

//exporting routes
module.exports=router;