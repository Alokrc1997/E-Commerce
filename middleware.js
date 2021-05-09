
const isLogedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','You Need to be Login First');
        return res.redirect('/login');
    }
    next();
}

module.exports={isLogedIn};