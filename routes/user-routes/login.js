const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../model/user')

router.post('/login', async (req,res)=>{
    const {username , password} = req.body; 
    if (username === 'admin' && password === 'admin123') {
        req.session.isAdminLoggedIn = true;
        return res.redirect('/admindashboard');
    }
    const user = await User.findOne({username});
    if(!user || !bcrypt.compareSync(password, user.password)){
        return res.render('./user/login',{errorMessage : "Invalid username or password"});
    }
    req.session.user = user; 
    res.redirect('/dashboard')
})

module.exports = router