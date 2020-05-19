import React, { useState } from "react";
import Navbar from "../NavBar";
import Login from "../Login";
import PersonalData from "./PersonalData";
import EventsHosted from "./EventsHosted";
import Participation from "./Participation"
import "../../Style/AccountNav.css"

function AccountNav(props) {

    var userInfo = props.userData
    const [renderComponent, setRenderComponent] = useState("");

    const handleClick = (componentName) => {
        setRenderComponent(componentName);
        console.log(renderComponent);
    }

    const renderSubComp = (renderComponent) => {
        switch (renderComponent) {
            case "personalData":
                return <PersonalData userInfo={userInfo} />
                break;
            case "eventsHosted":
                return <EventsHosted />
                break;
            case "participation":
                return <Participation />
                break;

        }
    }
    return (
        <div className="headerNavBar">
            <div className="accountNavBarDiv">
                <ul className="nav headerNav nav-pills nav-justified accountNavBar">
                    <li className="nav-item " onClick={() => handleClick('personalData')}>PersonalData</li>
                    <li className="nav-item text-muted" onClick={() => handleClick('eventsHosted')}>Events-Hosted</li>
                    <li className="nav-item text-muted" onClick={() => handleClick('participation')}>Participations</li>
                </ul>
            </div>
            <div className="personalContent">
                {renderSubComp(renderComponent)}
            </div>

        </div>
    )
}


export default AccountNav;