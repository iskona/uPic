import React from 'react'

function RatingStar( {id, starValue, starInnerText, rating } ) {

    console.log(`rating = ${rating} stravalue = ${starValue}`)
    const starred = (rating>starValue) ? true : false ;
    console.log("starred value "+starred);
    function updateRating(event) {
        console.log("--id --" + id);
        console.log(starInnerText)
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

