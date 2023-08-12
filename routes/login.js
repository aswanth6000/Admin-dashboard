const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user')

router.post('/login', async (req,res)=>{
    const {username , password} = req.body; 
    const user = await User.findOne({username});
    if(!user || !bcrypt.compareSync(password, user.password)){
        req.session.errorMessage = "Invalid username or password";
        return res.redirect('/');
    }
    req.session.user = user; 
    req.session.errorMessage = null;
    res.redirect('/home')
})

module.exports = router