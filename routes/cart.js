const express=require('express');
const route=express.Router();
const {isLogedIn}=require('../middleware');
const Product=require('../models/product');
const User=require('../models/user');


route.get('/user/cart/:id',isLogedIn,async (req,res)=>{
    try{
    const user=await User.findById(req.params.id).populate('cart');
    res.render('./cart/showCart',{user});
    }catch(e){
        req.flash('error','Failed to load your cart now');
        res.redirect('/products/error');
    }

})

route.post('/user/cart/:id',isLogedIn,async(req,res)=>{
    try{
     const product=await Product.findById(req.params.id);
     const user=req.user;
     user.cart.push(product);
     await user.save();
     req.flash('success','Item has been successfully added to your cart');
     res.redirect(`/user/cart/${user._id}`);
    }catch(e){
        req.flash('error',"Failed to add Product to Cart");
        res.redirect('/products/error');
    }

});

route.delete('/user/:userId/cart/:id',isLogedIn,async(req,res)=>{
    try{
    const {userId,id}=req.params;
    await User.findByIdAndUpdate(userId,{$pull:{cart:id}});
    req.flash("del","Item has been successfully removed");
    res.redirect(`/user/cart/${userId}`);
    }catch(e){
        req.flash('error','Failed to delete item from your cart');
        res.redirect(`/user/cart/${userId}`);
    }
});



module.exports=route;