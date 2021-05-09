const express=require('express');
const routes=express.Router();
const product=require('../models/product'); 
const Review=require('../models/review');
const {isLogedIn}=require('../middleware');

routes.get('/products',async(req,res)=>{
    try{
    const items=await product.find({});
    res.render('./products/index',{items});
    }catch(e){
        console.log(e.message);
        req.flash("error","Can't Find Product");
        res.redirect('/products/error');
    }
});

routes.get('/products/new',isLogedIn,(req,res)=>{
    res.render('./products/new');

});

routes.post('/products',isLogedIn,async(req,res)=>{
    try{
    req.flash("success","Product Created Successfully");
    await product.create(req.body.product);
    res.redirect('/products');
    }catch(e){
        console.log(e.message);
        req.flash("error","Can't Create Product");
        res.redirect('/products/error');
    }
});

routes.get('/products/error',(req,res)=>{
    res.status(500).render('./products/error');
     
})


routes.get('/products/:id',async(req,res)=>{
    try{
        const item =await product.findById(req.params.id).populate('reviews');
        res.render('./products/show',{item});
      }catch(e){
          console.log(e.message);
          req.flash("error","Can't find the Product");
          res.redirect('/products/error');
      }
      
});



routes.get('/products/:id/edit',isLogedIn,async(req,res)=>{

    try{
    const item= await product.findById(req.params.id);
    res.render('./products/edit',{item});
    }catch(e){
        console.log(e.message);
        req.flash("error","Can not fetch this product for Edit");
        res.redirect('/products/error');
    }
});

routes.patch('/products/:id',isLogedIn,async(req,res)=>{
    try{
    req.flash("success","Product Updated Successfully");
    await product.findByIdAndUpdate(req.params.id,req.body.product);
    res.redirect(`/products/${req.params.id}`);
    }catch(e){
        console.log(e.message);
        req.flash("error","Can not Update the Product");
        res.redirect('/products/error');

    }


});

routes.delete('/products/:id',isLogedIn,async(req,res)=>{
    try{
    req.flash("del","Product Deleted Successfully");
    await product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
    }catch(e){
        console.log(e.message);
        req.flash("error","Can not Delete this product");
        res.redirect('/products/error');
    }

});

routes.post('/products/:id/review',isLogedIn,async(req,res)=>{

    try{
    req.flash("success","You have successfully Reviewed the Product");
    const item=await product.findById(req.params.id);
    const review=new Review({
          user:req.user.username,
        ...req.body});
    item.reviews.push(review);
    await review.save();
    await item.save();
    res.redirect(`/products/${req.params.id}`);
    }catch(e){
        console.log(e.message);
        req.flash("error","Can not Review the Product");
        res.redirect('/products/error');
    }
    
})



module.exports=routes;