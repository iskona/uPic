import React, { useState } from "react";
import "../../Style/PersonalData.css";
import AdditionalInfo from "./AdditionalInfo";



function PersonalData(props) {
    console.log(props)
    const [InfoComponent, setInfoComponent] = useState(false);
    const [userDescription, setComponenetUserInfo] = useState(props.userInfo.description || "Tell us something about yourself");
    const showInfoComponent = () => {
        setInfoComponent(!InfoComponent);
    }

    const setDescription = (description) => {
        setComponenetUserInfo(description);
        setInfoComponent(false);
    }

    return (
        <div className="personalDetailsDiv">
            <div className="description desc-empty">
                {!InfoComponent && <i className=" descriptionBox empty-description-handler">{userDescription}</i>}
                {InfoComponent && <AdditionalInfo setDescription={setDescription} Desc={userDescription} />}
                {!InfoComponent && <button onClick={(showInfoComponent)} className="Fafa-pencil">
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>}
            </div>
            <div className="nameDiv">
                <div className="row">
                    <div className="col-2 text-muted"> Name </div>
                    <div className="col-2 "> {props.userInfo.name} </div>
                    <div className="col-6" />
                </div>
                <br></br>
                <div className="row">
                    <div className="col-2 text-muted"> Email </div>
                    <div className="col-2 "> {props.userInfo.email} </div>
                    <div className="col-6" />
                </div>

            </div>
            <div className = "galleryDiv">
                <p>Gallery </p>
            </div>
        </div>
    )

}
export default PersonalData;