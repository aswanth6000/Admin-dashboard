const express = require('express')
const router = express.Router();
const {isAdminLoggedIn} = require('../../middlewares/middleware')

router.get('/adminlogout', isAdminLoggedIn,(req, res)=>{
    req.session.isAdminLoggedIn = false;
    res.redirect('/')
})

module.exports = router