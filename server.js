const express = require("express")
const app = express()
const Razorpay = require("razorpay")
const shortid = require("shortid")
const cors = require("cors")
const mongoose = require("mongoose")
const url = "mongodb+srv://admin:I@mgreat7@elefaddb.riaeu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const UserModel = require("./Models/UserModel")
const OrderModel = require("./Models/order")
const path = require("path")
const bodyParser = require("body-parser")
const session = require('express-session')
const passport = require("passport")
const initiale = require("./passport")
const { type } = require("os")
const axios = require("axios")

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    app.listen(3001, () => {
        console.log("Connected to database");
        console.log("server fired up on port 3001");
    })
})
app.use(express.static(path.join(__dirname, "views")))
app.use(session({secret: "nothing here", resave: true, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
initiale(passport)
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,PUT,POST,DELETE,PATCH",
    credentials: true
}))

app.get("/", (req, res) => {
    const Register = new UserModel({
        username: "test",
        password: "test123",
        First_Name: "Test",
        Last_Name: "T",
        Email: "test@gmail.com"
    })
    console.log(Register);
    Register.save()
    res.send("Registered")
})

app.get("/login", (req, res) => {
    
    res.sendFile(path.join(__dirname, "views", "login.html"))
})

app.post("/pay", async (req, res) => {
    const keyId = "rzp_test_jXiNEklr7OXc6X"
	const secret = "Gcad54zyPJt8c8uxIjntleJc"
    const instance = new Razorpay({key_id:keyId, key_secret:secret})
    const currency = "INR"
    const payment_capture = 1
    // console.log(instance);
    try{
        const responce = await instance.orders.create({
            amount: 500,
            currency,
            // reciept: shortid.generate(),
            payment_capture
        })
        console.log(responce);
        // res.send('ok')
        res.json(responce)
    }catch(error){
        console.log(error);
    }
})

app.post("/login", (req, res, next) => {
    // res.send(req.body)
    passport.authenticate('local', {
        successRedirect: "/getusername",
        failureRedirect: "/dudeIsuck"
    })(req, res, next)
})

app.get('/success', (req, res) => {
    console.log(req.user.id);
    res.send(req.user.username)
})

app.get("/getusername", (req, res) => {
    console.log(typeof(JSON.stringify(req.user)));
    // console.log(JSON.parse(req.user));
    const data = {test: "Hello WOrld"}
    console.log(typeof(data));
    if(typeof(req.user) === "object"){
        res.json(req.user)
    }else{
        console.log("this should log when we get a request");
        // console.log(req.user.username);
        res.json({whatWeGot: "Nothing", type: typeof(req.user)})
    }
})

app.get("/dudeIsuck", (req, res) => {
    res.json({reason: "check"})
})

app.post("/register", (req, res) => {
    const Register = new UserModel({
        username: req.body.name,
        password: req.body.password,
        First_Name: req.body.name,
        Email: req.body.email
    })
    console.log(Register);
    Register.save()
    res.send("Registered")
})

app.get("/facebook", passport.authenticate("facebook"))

app.get("/google", (req, res) => {
    res.send("Google login")
})

app.get('/fbcomplete', passport.authenticate("facebook", {failureRedirect: "/loginagain"}), (req, res) => {
    res.redirect("/suckcess")
})

app.post("/placeorder", (req, res) => {

    const orderRegis = new OrderModel({
        razorID: req.body.razorResponse.razorpay_order_id,
        orderStatus: "Processing",
        total: req.body.products.total,

    })
    console.log(orderRegis.date);
    res.send({
        order: "Placed",
        body: req.body.razorResponse.id
    })
})

app.get("/shiprocket", (req, res) => {
    var data = JSON.stringify({
        "email": "kus.chaudhary777@gmail.com",
        "password": "I@mgreat7"
      });
      
      var config = {
        method: 'post',
        url: 'https://apiv2.shiprocket.in/v1/external/auth/login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      var token = null
      
      axios(config)
      .then(function (response) {
          token = response.data.token
          var dataOrder = JSON.stringify({
              "order_id": "654897",
              "order_date": "2021-08-5 01:00",
              "pickup_location": "Test",
              "channel_id": "",
              "comment": "Reseller: M/s Goku",
              "billing_customer_name": "Naruto",
              "billing_last_name": "Uzumaki",
              "billing_address": "House no 562, Sector",
              "billing_address_2": "Near Hokage House",
              "billing_city": "New Delhi",
              "billing_pincode": "110002",
              "billing_state": "Delhi",
              "billing_country": "India",
              "billing_email": "naruto@uzumaki.com",
              "billing_phone": "9876543210",
              "shipping_is_billing": true,
              "shipping_customer_name": "",
              "shipping_last_name": "",
              "shipping_address": "",
              "shipping_address_2": "",
              "shipping_city": "",
              "shipping_pincode": "",
              "shipping_country": "",
              "shipping_state": "",
              "shipping_email": "",
              "shipping_phone": "",
              "order_items": [
                {
                  "name": "Kunai",
                  "sku": "chakra123",
                  "units": 10,
                  "selling_price": "900",
                  "discount": "",
                  "tax": "",
                  "hsn": 441122
                }
              ],
              "payment_method": "Prepaid",
              "shipping_charges": 0,
              "giftwrap_charges": 0,
              "transaction_charges": 0,
              "total_discount": 0,
              "sub_total": 9000,
              "length": 10,
              "breadth": 15,
              "height": 20,
              "weight": 2.5
            });
            
            var configOrder = {
              method: 'post',
              url: 'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
              headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer '+token
              },
              data : dataOrder
            };
            
            axios(configOrder)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
      })
      .catch(function (error) {
        console.log(error);
      });
})

app.get("/createorder", (req, res) =>{
    
      res.send("order")
})