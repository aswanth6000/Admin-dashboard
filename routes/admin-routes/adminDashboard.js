const express = require('express')
const router = express.Router();
const User = require('../../model/user')
const {isAdminLoggedIn} = require('../../middlewares/middleware')

router.get('/admindashboard',isAdminLoggedIn, async (req,res)=>{
    try{
        const users = await User.find()
        res.render("./admin/admin-dash", {users})
    }catch(error){
        console.log(error);
    }
});

router.get('/delete/:userId', isAdminLoggedIn, async(req, res)=>{
    const userId = req.params.userId;
    try{
        await User.findByIdAndDelete(userId);
        res.redirect('/admindashboard')
    }catch(error){
        console.log(error);
    }
})

module.exports =  router