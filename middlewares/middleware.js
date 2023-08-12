const isAdminLoggedIn = (req, res, next )=>{
    if(req.session.isAdminLoggedIn){
        next();
    }else{
        res.redirect('/')
    }
}

module.exports = {isAdminLoggedIn}