import axios from "axios";

export default {
    saveUser: function (userDetails) {
        console.log(userDetails);
        return axios.post("/api/users/signup", userDetails);
    },
    checkUser: function (userDetails) {
        console.log(userDetails);
        return axios.post("/api/users/login", userDetails);
    },
    getContests: function () {
        return axios.get("/api/users/contests");
    }
};