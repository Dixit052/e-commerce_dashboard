const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./db/model/userModel');
const Product = require('./db/model/productModel');
const productModel = require('./db/model/productModel');
const Jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
require('./db/config');
const Jwt_key = process.env.JWT_KEY;
app.use(express.json());
const  veryToken = require('./middleware/auth_api');
///////////////////////////////////////
app.get("/", (req, res) => {
    res.send("server is set up successfully");

})
///////////////-- REGISTER API --////////////////////
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            name,
            email,
            password : hashedPassword
        });
        let savedUser = await newUser.save();
        savedUser = savedUser.toObject();
        delete savedUser.password;

        Jwt.sign({ savedUser }, Jwt_key, { expiresIn: "4h" }, (err, token) => {
            if (err) {
                res.status(401).json({ message: "Try again" });
            }
            else {
                res.send({ savedUser, auth: token, message: "Registration succesfull!" });
            }
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
///////////-----login API-- //////////////////////////////////////////
app.post('/login', async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne({ email: req.body.email });


        if (user) {

            const passwordMatch = await bcrypt.compare(req.body.password, user.password);

            if (passwordMatch) {
                user = user.toObject();
                delete user.password;
                Jwt.sign({ user }, Jwt_key, { expiresIn: '4h' }, (err, token) => {
                    if (err) {
                        res.status(401).json({ message: "Try again" });
                    }
                    else {

                        res.send({ user, auth: token, message: "User logined successfully" });
                    }
                })

            }
            else {
                res.status(500).json({ message: "InvalidPassword" });
            }
        }
        else {
            res.status(500).json({ message: "User Not exit with given Email" });
        }
    }
    else {
        res.status(500).json({ message: "Insert All field" });
    }
})

////////////addProduct_api////////////////
app.post("/add-product", async (req, res) => {
    const product = new productModel(req.body);
    const result = await product.save();
    res.send(result);

})

///////////////-- getproductApi--////////////
app.get("/product",veryToken, async (req, res) => {

    const product = await Product.find();
    if (product.length > 0) {
        res.send(product);
    }
    else {
        res.send({ result: "No Product Found" });
    }

})
//////////--DELETE API --///////////////////
app.delete("/product/:id", async (req, res) => {
    let response = await Product.deleteOne({ _id: req.params.id });
    res.send(response);
})

app.get("/product/:id", async (req, res) => {

    let respone = await Product.findOne({ _id: req.params.id });
    res.send(respone);

})
app.put("/product/:id", async (req, res) => {
    const response = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.send(response);
})

app.get("/search/:key", async (req, res) => {

    const result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    })

    res.send(result);

})






app.listen(5000, () => {
    console.log("App is running on port 5000");
})