const express = require('express');
const mongoose = require('mongoose');

const app = express();
const url = "mongodb://127.0.0.1:27017/register";

app.use(express.urlencoded({extended: true}));
//mongodb connection
mongoose.connect(url).then(()=>{
    console.log("mongodb connect");
})
.catch((err)=>{
    console.log("mongodb error: " + err);
})

//mongoose schema
const UserSchema = mongoose.Schema({
    name: String,
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: String
},{
    versionKey: false
})

// monoogse model 
const User = mongoose.model('Users' , UserSchema);

//api methods using mongodb

//post create
app.post('/api/users',async (req,res)=>{
    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    .then(()=>{
        res.json({message:"User created successfully"});
        console.log(User);
    }).catch(err=>res.json({message:"error"+err}));
})

//patch update
app.patch('/api/users/:id',async (req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{name:req.body.name})
    .then(()=>{
        res.json({message:"update success"})
    })
    .catch(err=>res.json({message:"update error"+err}))
})

//delete method
app.delete('/api/users/:id',async (req, res)=>{
    await User.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.json({message:"delete success"})
    })
    .catch(err=>res.json({message:"delete error"+err}))
})

app.listen(5000,()=>{
    console.log('listening on port 5000');
})