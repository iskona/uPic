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
    // createContestDetails: function (userDetails) {
    //     console.log(userDetails)
    //     return axios.post("/api/contests/hostevents", userDetails);
    // },
    getImageDetails: function (contestId){
        console.log('contest id is '+contestId);
        return axios.get("api/images/getImages/"+contestId);
    },

    getPersonalImages : function(){
        return axios.get("/api/images/personalAccount");
    },
    logoutUser: function(){
        return axios.get("/api/users/logout")
    },

    //Contest Api

    createContestDetails : function(userDetails) {
        return axios.post("/api/contests/hostevents",userDetails);
    },
    getOpenContests: function() {
        return axios.get("/api/contests/openContests");
    },
    getClosedContests: function() {
        return axios.get("/api/contests/closedContests");
    },
    checkUserParticipation(user,contestId){
        //this method checks in the image collecion to check if the user passed as an argument had already uploaded an image for the contest id passed.
        return axios.get("/api/images/checkUserParticipation/"+user+"/"+contestId);
    },
    getContestByEmail: function(){
        return axios.get("/api/contests/personalAccount");
    },
    getRating: function(img_id,contest_id,user){
        return axios.get("/api/images/getImageRating/"+img_id+"/"+contest_id+"/"+user);
    },
    updateRating: function(ratingDetails){
      console.log(ratingDetails)
       return axios.put("/api/images/updateRating",ratingDetails);
    },
    getContestByID :function(id){
        return axios.get("/api/contests/personalAccount/" + id)
    },
    updateContestDetails : function(id,userDetails){
        return axios.patch("/api/contests/personalAccount/" + id,userDetails )
    },
    getAverageRating : function(contest_id){
        return axios.get("api/images/calcAverageRating/"+contest_id);
    },
    updateAverageRating: function(contestRatings){
        return axios.put("/api/images/setAvgRating",contestRatings);
    }
}