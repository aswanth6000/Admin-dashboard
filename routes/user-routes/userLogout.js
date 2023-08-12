const express = require('express')
const router = express.Router();

router.get('/logout', (req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.redirect('/')
        }
    })
})

module.exports = router