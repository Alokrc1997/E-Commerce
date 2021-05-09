const express=require('express');
const router=express.Router();
const User=require('../models/user');
const passport=require('passport');
const {isLogedIn}=require('../middleware')


// router.get('/fakeUser',async(req,res)=>{

//     const user=new User({email:"alokrc1997@gmail.com",username:"Alok"});
//     const newUser=await User.register(user,"1234");
//     res.send(newUser);
// });

router.get('/register',(req,res)=>{
    res.render('./auth/register');
});

router.post('/register',async(req,res)=>{
    try{
        console.log()
        const user=new User({email:req.body.email,username:req.body.username});
         await User.register(user,req.body.password);
        req.flash("success","Registration Successfull");
        res.redirect('/register');

    }catch(e){
        req.flash("error",e.message);
        console.log(e);
        res.redirect('/register');
    }

});

router.get('/login',(req,res)=>{
    res.render('./auth/login');
});


router.post('/login',
  passport.authenticate('local', 
  {
    failureRedirect: '/login',
    failureFlash: true }),
    (req,res)=>{
        req.flash("success","Welcome Back");
        res.redirect('/products');

    });

    router.get('/logout',isLogedIn,(req,res)=>{
        req.logOut();
        req.flash("success","Loged Out Successfully");
        res.redirect('/login');
    })






module.exports=router;

