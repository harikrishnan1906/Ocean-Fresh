const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination:(req , file, cb) =>{
        let folder = "uploads/";

        if (file.fieldname === "productImage") {
          folder = "uploads/products";
        } else if (file.fieldname === "customerImage") {
          folder = "uploads/customer";
        } else if (file.fieldname === "branchImage") {
          folder = "uploads/branch";
        } else if (file.fieldname === "employeeImage") {
          folder = "uploads/employee";
        } else {
          folder = "uploads/dummy";
        }

        //create folder if the folder doesn't exsist
        if(!fs.existsSync(folder)){
            fs.mkdirSync(folder, {recursive:true});
        }

        cb(null, folder);
    },

    filename: (req ,file, cb) =>{
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

const upload = multer({storage});

module.exports = upload;