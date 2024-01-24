const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./db/model/userModel');
const Product = require('./db/model/productModel');
const productModel = require('./db/model/productModel');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))


//app.use(bodyParser.json())
require('./db/config');

app.use(express.json());
app.get("/", (req, res) => {
    res.send("server is set up successfully");

})
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({
            name,
            email,
            password
        });
        const savedUser = await newUser.save();
        res.status(200).json({ message: "user saved successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.post('/login', async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            if (req.body.password == user.password) {
                res.status(200).json({ message: "User logined successfully" });
            }
            else {
                res.status(500).json({ message:"InvalidPassword" });
            }
        }
        else {
            res.status(500).json({ message:"User Not exit with given Email" });
        }
    }
    else {
        res.status(500).json({ message: "Insert All field" });
    }
})

///// addProduct_api
app.post("/add-product",  async(req,res)=>{
    const product  =  new productModel(req.body) ;
    const result  = await product.save() ;
    res.send(result);

})

//// getproductApi
app.get("/product" ,async (req,res)=>{

    const product  = await Product.find();
    if(product.length>0){
        res.send(product);
    }
    else {
        res.send({result:"No Product Found"});
    }
    
})
app.delete("/product/:id", async(req,res)=>{
       let response  = await Product.deleteOne({_id:req.params.id}); 
      res.send(response);
})

app.get("/product/:id",async(req,res)=>{
   
    let respone = await Product.findOne({_id:req.params.id});    
    res.send(respone);

})
app.put("/product/:id" ,async (req,res)=>{
    const response  = await  Product.findOneAndUpdate({_id:req.params.id} ,req.body,{new:true});
    res.send(response);
})

app.get("search/:key",()=>{
 

    
})




app.listen(5000, () => {
    console.log("App is running on port 5000");
})