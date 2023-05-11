var express = require('express');
var router = express.Router();

const credentials = {
    email: "admin@gmail.com",
    password: "password"
};

//login user
router.post('/login',(req,res)=>{
    if(req.body.email == credentials.email && req.body.password == credentials.password)
    {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
    }else{
        res.render('base',{title:"Express",logout:"Invalid Username"});
    }
});

//route for dashboard
router.get('/dashboard', (req,res)=>{
    if(req.session.user)
    {
        res.render('dashboard',{user: req.session.user})
    }else{
        res.render('base');
    }
});

//route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err)
        {
            console.log(err);
        }else{
            res.render('base',{title:"Express",logout:"logout successfully..!"})
        }
    })
});

module.exports = router;