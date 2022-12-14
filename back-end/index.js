const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const userModel = require('./model/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { response } = require('express');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.use(cors());

mongoose.connect("mongodb+srv://andres11298:Andres11298@cluster0.tzcxeta.mongodb.net/misiontic2022?retryWrites=true&w=majority");


// ROUTES
app.get('/users',(req,res)=>{
    userModel.find({},(err,result)=>{
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.json(result.reverse())
        }
    })
});


app.post('/newUser',async (req,res)=>{
    const user = req.body;
    const newUser = new userModel(user);
    await newUser.save();
    res.send(user)
});

app.post('/login',(req,res)=>{
    const email = req.body.email;
    const pass = req.body.password;

    userModel.find({ email:email,password:pass},(err,result)=>{
        if(err){
            console.log(err);
            res.json(err);
        }else{
           if(result.length>0){
                let data = JSON.stringify(result);
                const token = jwt.sign(data,'sedan');
                res.json({token});
           }else{
                res.status(401).send("usuario no valido o no coincid")
           }
        }
    });
});

app.post('/test',verifyToken,(req,res)=>{
    console.log(req.data[0].email)
    res.send('info secreta')
})

function verifyToken(req,res,next){
    if(!req.headers.authorization) return res.status(401).json('no autorizado');

    const token = req.headers.authorization.substr(7);
    if(token!==''){
        const content = jwt.verify(token,'sedan');
        req.data = content;
        next();
    }else{
        res.status(401).json('token vacio o no valido')
    }
}




app.listen(3001,()=>{
    console.log("todoo goodd");
})