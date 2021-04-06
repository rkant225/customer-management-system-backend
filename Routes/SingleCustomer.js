const express = require('express');
const Customer = require('../Models/Customer');
const Router = express.Router();
const defaultResponse = {isSuccessfull : true};


// This will return all the products list.
Router.get('/:customerId', async (req, res, next)=>{ 
    const customerId = req.params.customerId;
    try {
        const customer = await Customer.findById(customerId).exec();
        res.status(200);
        res.send({...defaultResponse, customer : customer});
    } catch(err) {
        res.status(200);
        res.send({isSuccessfull : false, error : err})
    }
});



module.exports = Router;