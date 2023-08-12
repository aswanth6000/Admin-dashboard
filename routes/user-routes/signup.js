const express = require('express');
const router = express.Router()
const bycript = require('bcrypt');
const User = require('../../model/user')

const multer = require('multer');
const path = require('path');
const { db } = require('../../model/user');

const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, './public/uploads')
    },
    filename : (req, file, cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
});
const upload = multer({storage : storage})


router.post('/signup',upload.single('profileImage'), async(req,res)=>{
    const {username, password, confirmPassword, phone, address, email} = req.body;
    if(password != confirmPassword){
        const errorMessage = "Passwords do not match ";
        return res.render('./user/signup', {errorMessage})
    }
    const hashedPassword = await bycript.hash(req.body.password, 10);
    const user = new User({
        username : req.body.username,
        password : hashedPassword,
        phoneNumber : req.body.phone,
        address : req.body.address,
        email : req.body.email,
        profileImage : req.file ? req.file.filename : ''
    })
    await user.save();
    res.redirect('/');
});
module.exports = router