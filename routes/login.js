const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user')

router.post('/login', async (req,res)=>{
    const {username , password} = req.body; 
    const user = await User.findOne({username});
    if(!user || !bcrypt.compareSync(password, user.password)){
        return res.render('login',{errorMessage : "Invalid username or password"});
    }
    req.session.user = user; 
    res.redirect('/dashboard')
})

module.exports = router