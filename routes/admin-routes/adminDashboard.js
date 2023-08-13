const express = require('express')
const router = express.Router();
const User = require('../../model/user')
const {isAdminLoggedIn} = require('../../middlewares/middleware')

router.get('/admindashboard',isAdminLoggedIn, async (req,res)=>{
    try{
        const searchQuery = req.query.search || '';
        let users;
        if(searchQuery){
            users = await User.find({username : {$regex : searchQuery, $options : 'i'}})
        }else{
            users = await User.find()
        }
        res.render("./admin/admin-dash", {users, searchQuery})
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