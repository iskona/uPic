import axios from "axios";

export default {
    saveUser: function(userDetails){
        console.log(userDetails);
       return axios.post("/api/users/signup",userDetails);
        
    },
    checkUser: function(userDetails) {
        console.log(userDetails);
        return axios.post("/api/users/login", userDetails);
    },
    getUser: function() {
        return axios.get("/api/users/personalAccount");
      }
}