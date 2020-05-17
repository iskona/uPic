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
      },
    getContests: function(req, res) {
        return axios.get("api/contests");
    },
    saveImageDetails: function(imageDetails) {
        console.log("image details are "+imageDetails);
        return axios.post("api/images/saveImage",imageDetails);
    }
}