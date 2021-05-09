const mongoose=require('mongoose');
const product=require('./models/product');

const items=[{
    name:"I-Phone",
    image:"https://images.unsplash.com/photo-1595514736566-0221cb0945e2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGlwaG9uZSUyMDEyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    price:100000,
    desc:"Beyond adding 5G, Apple has equipped the iPhone 12 family with its powerful new A14 Bionic processor, a Super Retina XDR display, a more durable Ceramic Shield front cover, and a MagSafe feature for more reliable wireless charging, and support for attachable accessories."
},
{
    name:"Titan Watch",
    image:"https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHRpdGFuJTIwd2F0Y2h8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    price:50000,
    desc:"Beyond adding 5G, Apple has equipped the iPhone 12 family with its powerful new A14 Bionic processor, a Super Retina XDR display, a more durable Ceramic Shield front cover, and a MagSafe feature for more reliable wireless charging, and support for attachable accessories."
},
{
    name:"Macbook",
    image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1hY2Jvb2t8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    price:120000,
    desc:"Beyond adding 5G, Apple has equipped the iPhone 12 family with its powerful new A14 Bionic processor, a Super Retina XDR display, a more durable Ceramic Shield front cover, and a MagSafe feature for more reliable wireless charging, and support for attachable accessories."
},
{
    name:"Speakers",
    image:"https://images.unsplash.com/photo-1545454675-3531b543be5d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3BlYWtlcnN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    price:70000,
    desc:"Beyond adding 5G, Apple has equipped the iPhone 12 family with its powerful new A14 Bionic processor, a Super Retina XDR display, a more durable Ceramic Shield front cover, and a MagSafe feature for more reliable wireless charging, and support for attachable accessories."
},
{
    name:"Headphones",
    image:"https://images.unsplash.com/photo-1600086827875-a63b01f1335c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGJsdWV0b290aHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    price:100000,
    desc:"Beyond adding 5G, Apple has equipped the iPhone 12 family with its powerful new A14 Bionic processor, a Super Retina XDR display, a more durable Ceramic Shield front cover, and a MagSafe feature for more reliable wireless charging, and support for attachable accessories."
}];

const seedDB= async()=>{
     await product.insertMany(items)
    .then(()=>{
        console.log("Data Seeded Successfully");
    })
    .catch((err)=>{
        console.log("Error in seeding Data");
    })
}
module.exports=seedDB;