import React from 'react'
import API from "../../utils/API";

function RatingStar( {id, starValue, starInnerText, rating, contestId, ratingUpdateHandler} ) {

    console.log(`rating = ${rating} stravalue = ${starValue}`)
    const starred = (rating>=starValue) ? true : false ;
    console.log("starred value "+starred);
    function updateRating(event) {
        console.log("--id --" + id);
        console.log(starValue)
        const ratingDetails = {
            image_id : id,
            contest_id: contestId, // NEEDS TO BE DYNAMIC
            user:localStorage.getItem("email"),
            rating  : starValue
        }
        API.updateRating(ratingDetails)
           .then(dbData => {
               console.log(dbData.data.rating);
               ratingUpdateHandler(dbData.data.rating);
            })
           .catch(err => console.log(err));
    }

    return (
        <>
            <input className="visuallyhidden" type="radio" name="rating" id={id} value={starValue} />
            <label htmlFor={id}
                    onClick={updateRating}
                    >
                <span className="visuallyhidden">{starInnerText}</span>
                <i className={starred ? "fa-star fas" : "fa-star far"} style={{color:"	#D4AF37"}}></i>
            </label>
        </>
    )
}
export default RatingStar

