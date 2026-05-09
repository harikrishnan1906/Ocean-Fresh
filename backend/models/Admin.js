const mongoose = require("mongoose");
const hashPassword = require("../utils/hashPassword");

const AdminSchema = new mongoose.Schema({
    email :{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    }
});

AdminSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        return next();
    }

    try{
        this.password = await hashPassword(this.password);
    }
    catch(err){
        next(err);
    }
});

module.exports = mongoose.model("Admin", AdminSchema);