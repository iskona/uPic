import React, { useEffect, useState } from "react"
import API from "../../utils/API"
import AccountHeader from "./AccountHeader";
import AccountNav from "./AccountNav";


function Account() {
    const [usersState, setuserState] = useState({
        name: "",
        email: "",
        user : {}
    });

    useEffect(() => {
        API.getUser().then(res => {
            console.log("getuser data");
            console.log(res.data.user.email)
            setuserState({
                name: res.data.user.name,
                email: res.data.user.email,
                user:res.data.user
            })
        })
            .catch(err => console.log(err))
    }, []
    );

return (
    <React.Fragment>
        <AccountHeader userData = {usersState.user} />
        <AccountNav userData = {usersState.user} />
    </React.Fragment>
)

}

export default Account;