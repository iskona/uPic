const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function ValidateLoginInputData(data){
    console.log("data login "+data.email+data.password);
    let errors = {};

    //converting empty fields to empty string to work with Validator, which only for empty Strings

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //Email checks
    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is Required ";
    }

    //Password checks 
    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required ";
    }
    return {errors, isValid:isEmpty(errors)} ;
}