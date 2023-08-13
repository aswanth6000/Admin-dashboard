const express = require('express');
const router = express.Router();
const { isAdminLoggedIn } = require('../../middlewares/middleware');
const User = require('../../model/user');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/edited/:userId', isAdminLoggedIn, upload.single('profileImage'), async (req, res) => {
    const userId = req.params.userId;
    const { newUserName, newAddress, newPhone } = req.body;
    const user = await User.findById(userId);
    try {
        user.username = newUserName;
        user.address = newAddress;
        user.phoneNumber = newPhone;

        if (req.file) {
            user.profileImage = req.file.filename;
        }
        await user.save();
        res.redirect('/admindashboard');
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
