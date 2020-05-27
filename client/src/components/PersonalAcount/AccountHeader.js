import React from "react";
import "../../Style/AccountHeader.css";

function AccountHeader(props) {
    console.log(props.userData);
     var joiningdate = props.userData.date;

    return (
        <React.Fragment>
            <div className="row banner">
                <div className="banner-text">
                    <h1 className="responsive-headline respHeader"> {props.userData.name} </h1>
                    <p className = "text-center joiningText">
                     Joined On:  { `${joiningdate}`.substring(0,10) }
                    </p>
                </div>
            </div>
        </React.Fragment>

    )
}

export default AccountHeader;