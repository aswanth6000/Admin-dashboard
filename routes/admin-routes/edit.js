const express = require('express');
const router = express.Router();
const {isAdminLoggedIn} = require('../../middlewares/middleware')
const User = require('../../model/user')


router.get('/edit/:userId', isAdminLoggedIn, async (req,res)=>{
    const userId = req.params.userId;
    try{
        const user = await User.findById(userId);
        res.render('./admin/edit', {user})
    }catch(error){
        console.log(error);
    }
})


module.exports = router