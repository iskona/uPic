import React, {  useState } from 'react'
import "../../Style/PersonalData.css"
import API from "../../utils/API";

function AdditionalInfo(props) {    
    const[textareaDetail,settextareaDetail] = useState(props.Desc)

    function handleChange(evt) {
        settextareaDetail(evt.target.value);
    }

    const updateDetails = (event) => {
        event.preventDefault();
        API.updateUserDetais({
            description: textareaDetail
        }).then(res => {
            props.setDescription(res.data.description)
        })
    };

    return (
        <div>
            <form className = "form-group infoFormSection">
               <textarea className="form-control" rows="6"
               name = "textarea" value = {textareaDetail} 
                onChange={handleChange} >
                    {props.Desc}
                </textarea>
              
         <button className = "saveButton" onClick = {updateDetails}>Save</button>
                
            </form>
        </div>
            
     
    );
}
export default AdditionalInfo;