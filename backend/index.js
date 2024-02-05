const cors = require("cors");
const express = require("express");
//TODO:Stripe key 
// const stripe = require("stripe")("");
const { v4: uuidv4 } = require('uuid');

const app = express();

// middleware
app.use(cors());
app.use(express.json())
// routes
app.get("/",(req,res)=>{
    res.send("It is working on my site");
})
app.post("/payment",(req , res)=>{
    const {product , token} = req.body;
    console.log("PRODUCT ", product);
    console.log("PRICE ",product.price);
    const idempontencyKey = uuidv4();
    // Create a new customer and then create an invoice item then invoice it:
    return stripe.customers
    .create({
    email: token.email,
    source: token.id
    })
    .then((customer) => {
    // have access to the customer object
    stripe.charges.create({
        customer: customer.id, // set the customer id
        amount: product.price * 100, 
        currency: 'usd',
        receipt_Email : token.email,
        description: product.name,
        shipping:{
            name : token.card.name,
            address:{
                country : token.card.address_country
            }
        }
    }, {idempontencyKey})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            console.log(err)
        });
    });
})

// listening
app.listen(8080,()=>{console.log("Listening on port 8080")})