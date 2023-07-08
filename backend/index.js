const express=require("express");
const User = require('./db/User');
const app=express();
const modelitem = require("./routes/todoItems")
const mongoose=require("mongoose")
const url="mongodb://0.0.0.0:27017/to-do";

mongoose.connect(url)
const con=mongoose.connection;

con.on("open",()=>{
    console.log("Connected to database")
})

app.use(express.json());

var cors = require('cors');
app.use(cors());

const Jwt = require('jsonwebtoken');
const jwtKey = 'nit';

app.use(express.json());
app.use(modelitem)


app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({result}, jwtKey, {expiresIn:"2h"},(err,token)=>{
        if(err){
            resp.send("Something went wrong")  
        }
        resp.send({result,auth:token})
    })
})
app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({user}, jwtKey, {expiresIn:"2h"},(err,token)=>{
                if(err){
                    resp.send("Something went wrong")  
                }
                resp.send({user,auth:token})
            })
        } else {
            resp.send({ result: "No User found" })
        }
    } else {
        resp.send({ result: "No User found" })
    }
});

app.listen(5000);