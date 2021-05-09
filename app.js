if(process.env.NODE_ENV!=='production'){
    require('dotenv').config();
}

const express=require('express');
const app=express();
const path=require('path');
const methodOverride=require('method-override');
const session=require('express-session');
const mongoose =require('mongoose');
const flash=require('connect-flash');
const seedDB = require('./seed');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const productRoute=require('./routes/product');
const authRoute=require('./routes/auth');
const cartRoute=require('./routes/cart');
const User=require('./models/user');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

const sessionConfig={
    secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}
app.use(session(sessionConfig));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.del=req.flash('del');
    res.locals.error=req.flash('error');
    res.locals.currentUser=req.user;
    
    next();
})




mongoose.connect(process.env.DB_URL,
    {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify:false,
     useCreateIndex:true
     
    })
    .then(()=>{
        console.log("Database Connected Successfully");
    })
    .catch((err)=>{
        console.log(err);
    })


    app.use(productRoute);
    app.use(authRoute);
    app.use(cartRoute);



    app.get('/',(req,res)=>{
        res.send("This is Landing Page");
    })

 //seedDB();


    app.listen(process.env.PORT || 3000,()=>{
        console.log("Listening on Port No. 3000");
    })