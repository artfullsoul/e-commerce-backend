const express = require('express');
const app = express();
const morgan = require('morgan');//this is a logging package

const bodyParser = require('body-parser'); //THIS IS USED TO READ THE BODY OF INCOMING REQ 
//BY DEFAULT THE BODY I SNOT RECEIVED IN A REDABLE FORMAT

const mongoose = require("mongoose");

//FILES CONTAINING AND HANDLING DIFFERENT API ROUTES
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/order");
const reviewRoutes = require("./api/routes/review");
const blogReviewRoutes = require("./api/routes/blogReview");
const blogRoutes = require("./api/routes/blog");
const parentResource = require("./api/routes/parent");
const hungrymanResource = require("./api/routes/Hungryman");
const deliveryBoyResource = require("./api/routes/DeliveryBoy")
const dishesResource = require("./api/routes/Dishes")
const restrauntResource = require("./api/routes/Restraunt")
// THIS FUNCTION HANDLE DEFAULT ROUTES
// app.use((req,res,next) => {
//     res.status(200).json({
//         message:"It Works!"
//     })
// })

mongoose.connect("mongodb+srv://Chirag:chirag%40123@cluster0.auepg.mongodb.net/?retryWrites=true&w=majority",
    {useNewUrlParser: true,useUnifiedTopology: true  })
    .then(() => console.log("MongoDB Connected... "))
    .catch(err => console.log("MongoDB not connected with error:-"+err));

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({extended:false})); //to allow to read urlencoded data
app.use(bodyParser.json());

//This line over here is to pass access origin
//By default the browser on diff server are not allowed to access data 
//But here we allow browsers to acess our data
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*"); //here instead of * if we use a Url then only therequest comming from that url would be allowed
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization")

    if(req.method === "OPTIONS") //by default the first req sendt by browser is of "OPTIONS" which states what all types are supported by our apis
    {
        res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE, GET");
        return res.status(200).json({});
    }
    next()
})

//ANY REQUEST COMMING TO /products WOULD BE FORWARDED TO PRODUCT FILE
app.use("/products",productRoutes);
app.use("/order",orderRoutes);
app.use("/review",reviewRoutes);
app.use("/blogReview",blogReviewRoutes);
app.use("/blog",blogRoutes);
app.use("/parent",parentResource);
app.use("/deliveryBoy",deliveryBoyResource);
app.use("/hungryman",hungrymanResource);
app.use("/dishes",dishesResource);
app.use("/restraunts",restrauntResource)

//ANY REQUEST NOT HANDLED BY ANY OF THE ABOVE TWO ROUTES WOULD THEN BE SENT HERE
app.use((req,res,next) => {
    const error = new Error("Not found");
    error.status=404;
    next(error)
})

//THIS IS JUST TO HANDLE ALL THE ERRORS OF THE APP
app.use((err,req,res,next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message
    })
})

module.exports = app;