import React, { useState, useRef } from 'react'
import "../../Style/PersonalData.css"
import API from "../../utils/API";


function AdditionalInfo(props) {
    const userDescription = useRef();
    const updateDetails = (event) => {
        event.preventDefault();
        API.updateUserDetais({
            description: userDescription.current.value
        }).then(res => {
            props.setDescription(res.data.description)
        })
    };
    return (
        <div>
            <form className = "form-group infoFormSection">
               <textarea class="form-control" rows="6" ref={userDescription} >
                    {props.Desc}
                </textarea>
              
         <button className = "saveButton" onClick = {updateDetails}>Save</button>
                
            </form>
        </div>
            
     
    );
}
export default AdditionalInfo;