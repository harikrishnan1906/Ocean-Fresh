const bcryptjs = require("bcryptjs");

const hashPassword = async(password) =>{

    try{
         const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);

    return hashedPassword;

    }
    catch(err){
        throw err;
    }
   
};

module.exports = hashPassword;