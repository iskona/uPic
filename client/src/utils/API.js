import axios from "axios";

export default {
    saveUser: function(userDetails){
        // console.log(userDetails);
       return axios.post("/api/users/signup",userDetails);
        
    },
    checkUser: function(userDetails) {
        // console.log(userDetails);
        return axios.post("/api/users/login", userDetails);
    },
    getUser: function() {
        return axios.get("/api/users/personalAccount");
      },
      updateUserDetais: function(userDetails){
        return axios.patch("/api/users/personalAccount", userDetails);
    },

    logoutUser: function(){
        return axios.get("/api/users/logout")
    },
    createContestDetails : function(userDetails) {
        // console.log(userDetails)
        return axios.post("/api/contests/hostevents",userDetails);
    },
    getContests: function() {
        return axios.get("/api/contests/contests");
    },
    getContestByEmail: function(){
        return axios.get("/api/contests/personalAccount");
    }
}