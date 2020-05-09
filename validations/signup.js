//require validator and is-empty npm packages
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports =  function validateSignupInputData(data){
//data is sent from front end react registration/sign up form 
console.log("data passed ****** "+data.name+" "+data.email+" "+data.password+" "+data.password2);
let errors = {};
//convert empty fields tp an empty string, so we can use Validator functions, which work only for strings
 data.name = !isEmpty(data.name) ? data.name : "";
 data.email = !isEmpty(data.email) ? data.email : "";
 data.password = !isEmpty(data.password) ? data.password : "";
 data.password2 = !isEmpty(data.password2) ? data.password2 : "";

 //Name Checks 
if(Validator.isEmpty(data.name)) {
  errors.name = "Name field is required "  ;
}

//Email checks
if(Validator.isEmpty(data.email)){
    errors.email = "Email field is required";
}else 
    if( !Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }
//Password Checks
if(Validator.isEmpty(data.password)){
    errors.password = "PassWord field is required";
}
if(Validator.isEmpty(data.password2)){
    errors.password2="Conform Password field is required ";
}
if(!Validator.isLength(data.password, { min: 6, max: 30})){
    errors.password = "Password must be atleast 6 characters long ";
}
if(!Validator.equals(data.password, data.password2)){
    errors.password2 = "Passwords Must match ";
}

return {
    errors,
    isValid: isEmpty(errors)
}
}


