const mongoose= require('mongoose');
const Review=require('./review')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    price:{
        type:Number,
        min:0
    },
    desc:{
        type:String
    },
    reviews:[
        {type:mongoose.Schema.Types.ObjectId,
             ref:'Review'

    }]


});

const product=mongoose.model('Product',productSchema);
module.exports=product;