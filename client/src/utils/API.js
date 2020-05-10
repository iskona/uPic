import axios from "axios";

export default {
    saveUser: function(userDetails){
        console.log(userDetails);
       return axios.post("/api/users/signup",userDetails);
        
    },
    ckeckUser: function(userDetails) {
        console.log(userDetails);
        return axios.post("/api/users/login", userDetails);
    }
}