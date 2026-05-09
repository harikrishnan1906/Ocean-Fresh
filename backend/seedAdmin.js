const express = require("express");
const cors = require("cors");
const mongoose =require("mongoose");
const Admin = require("./models/Admin");
require("dotenv").config();

const seedAdmin = async()=>{

    try{
        
   await mongoose
     .connect(process.env.MONGO_CONNECT_STRING)
     .then(() => console.log("Mongo DB connected successfully"))
     .catch((err) => console.log(err));

    const existingAdmin = await Admin.findOne({email:"admin@gmail.com"});

    if(!existingAdmin){
        
        const admin = await Admin.create({
            email: "admin@gmail.com",
            password:"admin5099"
        });

        console.log("Admin created");
        
    }
    else{
        console.log("Admin already exsit");
        
    }
    }
    catch(err){
        console.log(err);
        
    }
    finally{
        await mongoose.connection.close();
    }
    
}

seedAdmin();