const express = require('express')
const router = express.Router();

router.get('/admindashboard',(req,res)=>{
    res.render("./admin/admin-dash")
})

module.exports =  router