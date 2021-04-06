const express = require('express');
const BodyParser = require('body-parser'); // Import body-parser this will extract the json object passes by client in request body.
const cors = require('cors');
require('dotenv').config(); // To access environmental variables, This import is enough No need to import in each and every file.
const {connectDB} = require('./DB/MongoDb');

const homeRoute = require('./Routes/Home');
const authRoute = require('./Routes/Auth');
const customerRoute = require('./Routes/Customer');
const singleCustomerRoute = require('./Routes/SingleCustomer');


const app = express();
const PORT = process.env.PORT;
const API_URL_Prefix = process.env.API_Prefix;

//----DataBAse Connection----
connectDB();
//----DataBAse Connection----
//----Allow CORS----
app.use(cors());
//----Allow CORS----

//----Body-Parser Middleware----
app.use(BodyParser.json()); // BodyParser middleware : This will extract JSON body passes from client and add to "body" property in request.
//----Body-Parser Middleware----



//----Routes---------ORDER MATTERS(Routes ABOVE 'AuthenticateAccessTokenAndSetUserMiddleware' are freely accessible, No token is required. And Routes BELOW this middleware will not work if access_token is not provided)---------
app.use(homeRoute);
app.use(`${API_URL_Prefix}/auth`, authRoute);
app.use(`${API_URL_Prefix}/customer`, customerRoute);
app.use(`${API_URL_Prefix}/singleCustomer`, singleCustomerRoute);
//----Routes---------ORDER MATTERS(Routes ABOVE 'AuthenticateAccessTokenAndSetUserMiddleware' are freely accessible, No token is required. And Routes BELOW this middleware will not work if access_token is not provided)---------



// This will be executed only when none of the above routes sent response to the client.
app.use((req, res, next)=>{ 
    res.status(200);
    res.send({isSuccessfull : false, errorMessage : "Bad request, This path doesn't exist."})
});



// Error handling Middleware (it must get 4 paramerers)
app.use(function (error, req, res, next) {
    if (error instanceof SyntaxError) {
        res.status(200)
        res.send({isSuccessfull : false, errorMessage : "Invalid Json passed."})
    } else {
        res.status(200)
        res.send({isSuccessfull : false, errorMessage : "Something went wrong.", error : error})
    }
});

app.listen(PORT, ()=>{
    console.log(`Server started listening at Port : ${PORT}`)
})