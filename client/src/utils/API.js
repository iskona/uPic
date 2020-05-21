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
    getUser: function () {
        return axios.get("/api/users/personalAccount");
    },
    // getContests: function (req, res) {
    //     return axios.get("api/contests");
    // },
    saveImageDetails: function (imageDetails) {
        console.log("image details are " + imageDetails);
        return axios.post("api/images/saveImage", imageDetails);
    },
    updateUserDetais: function(userDetails) {
        return axios.patch("/api/users/personalAccount", userDetails);
    },
    createContestDetails: function (userDetails) {
        console.log(userDetails)
        return axios.post("/api/contests/hostevents", userDetails);
    },
    getImageDetails: function (contestId){
        console.log('contest id is '+contestId);
        return axios.get("api/images/getImages/"+contestId);
    },
    getContests: function() {
        return axios.get("/api/contests/contests");
    },
    checkUserParticipation(user,contestId){
        //this method checks in the image collecion to check if the user passed as an argument had already uploaded an image for the contest id passed.
        return axios.get("/api/images/checkUserParticipation/"+user+"/"+contestId);
    }
}