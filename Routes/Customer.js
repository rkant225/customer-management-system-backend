const express = require('express');
const Customer = require('../Models/Customer');
const User = require('../Models/User');

const Router = express.Router();
const defaultResponse = {isSuccessfull : true};


// This will return all the products list.
Router.get('/', async (req, res, next)=>{ 
    try {
        const customers = await Customer.find({}).sort({date : -1}).exec();
        res.status(200);
        res.send({...defaultResponse, customers : customers});
    } catch(err) {
        res.status(200);
        res.send({isSuccessfull : false, error : err})
    }
});

// Router.get('/getSingleProduct', async (req, res, next)=>{
//     const {productId} = req.body;
//     try {
//         const product = await Product.findById(productId).populate('category').exec();
//         if(product){
//             res.status(200);
//             res.send({...defaultResponse, product : product});
//         } else {
//             res.status(200);
//             res.send({isSuccessfull : false, errorMessage : "Product not found."});
//         }
        
//     } catch(err) {
//         res.status(200);
//         res.send({isSuccessfull : false, error : err})
//     }
// });


Router.get('/getItemsList', async (req,res,next)=>{
    try{
        const itemsList = [ 'TABLE_FAN_CINNI_MODEL', 'FARRATA_SAGAR_MODEL', 'FARRATA_CENTURY_MODEL', 'FARRATA_5_SWEEP',  'CELLING_FAN', 'COOLER_KIT', 'EXHAUST_HEAVY', 'EXHAUST_SMALL', 'TULLU', 'MOTOR_.5_HP', 'MOTOR_1_HP', 'MOTOR_1.5_HP', 'MOTOR_2_HP', 'SUBMERSIBLE_.5_HP', 'SUBMERSIBLE_1_HP', 'SUBMERSIBLE_1.5_HP', 'SUBMERSIBLE_2_HP'];

        res.status(200);
        res.send({...defaultResponse, itemsList : itemsList});
    } catch(err){
        res.status(200);
        res.send({isSuccessfull : false, errorMessage : 'Unable to fetch items list.',  error : err})
    }
});

Router.post('/add', async (req,res,next)=>{
    const {name, mobileNo, address, item, description, date} = req.body;
    try{
            const newCustomer = new Customer({
                name : name,
                description : description,
                mobileNo : mobileNo,
                address : address,
                item : item,
                date : date,
            });
            await newCustomer.save(); // ToDo : need to uncomment when multer is implemented properly.
    
            res.status(200);
            res.send({...defaultResponse, customer : newCustomer});
    } catch(err){
        res.status(200);
        res.send({isSuccessfull : false, errorMessage : 'Something went wrong, Unable to add customer.',  error : err})
    }
});

Router.put('/updateStatus', async (req,res,next)=>{
    const {customerId, status, money} = req.body;
    
    try{
        const existingCustomer = await Customer.findById(customerId);
        if(existingCustomer){
            const updatedCustomer = await Customer.findByIdAndUpdate(customerId ,{
                status : status,
                money : money
            }, {new : true, runValidators : true}); // 'new' will return updated record AND 'runValidators' will run all the validators on data while savilg like "ENUM"
    
            res.status(200);
            res.send({...defaultResponse, customer : updatedCustomer});
        } else {
            res.status(200);
            res.send({isSuccessfull : false, errorMessage : 'Customer not found.'})
        }
            
    } catch(err){
        res.status(200);
        res.send({isSuccessfull : false, errorMessage : 'Something went wrong, Unable to add customer.',  error : err})
    }
});

// Router.put('/update', async (req, res, next)=>{
//     const {productId, name, description, richDescription, imageUrl, brand, price, category,  countInStock, rating, totalReviews, isFeatured} = req.body;
//     try{
//         const existingCategory = await Category.findById(category);
//         if(existingCategory){
//             const updatedProduct = await Product.findByIdAndUpdate(productId, {
//                 name : name,
//                 description : description,
//                 richDescription : richDescription,
//                 imageUrl : imageUrl,
//                 brand : brand,
//                 price : price,
//                 category : category,
//                 countInStock : countInStock,
//                 rating : rating,
//                 totalReviews : totalReviews,
//                 isFeatured : isFeatured,
//             }, {new : true}); // Here "new : true" is used to return the updated data, otherwise it will return old data.
    
//             if(updatedProduct){
//                 res.status(200);
//                 res.send({...defaultResponse, product : updatedProduct});
//             } else {
//                 res.status(200);
//                 res.send({isSuccessfull : false, errorMessage : "Product not exist."})
//             }
//         } else {
//             res.status(200);
//             res.send({isSuccessfull : false, errorMessage : "Associated categoyy doesnot exist."})
//         }
//     } catch(err){
//         res.status(200);
//         res.send({isSuccessfull : false, error : err})
//     }
// });

// Router.put('/updateImageGalery', async (req, res, next)=>{
//     const {productId} = req.body;
//     try{
//         if(req.files){

//             const existingProduct = await Product.findById(productId);
//             if(existingProduct){
//                 let imageURLs = [];

//                 for(let file of req.files){
//                     imageURLs.push(`Public/images/${file.filename}`);
//                 }
    
//                 const updatedProduct = await Product.findByIdAndUpdate(productId, {
//                     imageGalery : imageURLs
//                 }, {new : true}); // Here "new : true" is used to return the updated data, otherwise it will return old data.
    
//                 res.status(200);
//                 res.send({...defaultResponse, product : updatedProduct});
//             } else {
//                 res.status(200);
//                 res.send({isSuccessfull : false, errorMessage : "Product not exist."})
//             }
//         } else {
//             res.status(200);
//             res.send({isSuccessfull : false, errorMessage : 'Files are invalid or they have unsupportrd extension. Make sure you have provided valid files.'})
//         }
//     } catch(err){
//         res.status(200);
//         res.send({isSuccessfull : false, error : err})
//     }
// });

// Router.delete('/delete', async (req, res, next)=>{
//     const {productId} = req.body;
//     try{
//         const product = await Product.findByIdAndDelete(productId);
//         if(product){
//             res.status(200);
//             res.send({...defaultResponse});
//         } else {
//             res.status(200);
//             res.send({isSuccessfull : false, errorMessage : 'No product found.'})
//         }
//     }catch(err){
//         res.status(200);
//         res.send({isSuccessfull : false, error : err})
//     }
// });




module.exports = Router;