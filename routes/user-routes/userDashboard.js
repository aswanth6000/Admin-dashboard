const express = require('express');
const router = express.Router()

router.get('/dashboard',(req,res)=>{
    if(!req.session.user){
        return res.redirect('/')
    }
    const currentUser = req.session.user
    res.render('./user/dashboard', {currentUser})
});

module.exports = router