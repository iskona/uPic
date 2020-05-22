import React from 'react'
import "../../Style/RatingForm.css";
import RatingStar from './RatingStar';

function RatingForm({ img, i}) {
    console.log(img)
    console.log("image sent "+img._id);
    console.log("i "+i);
    const labelText = {
        1: "One Star",
        2: "Two Stars",
        3: "Three Stars",
        4: "Four Stars",
        5: "Five Stars"
      };
    return (
        <form action="post">
             <RatingStar  id={img._id+"-star-1"} starValue="1" starInnerText={labelText[1]} rating={img.rating}/>
             <RatingStar  id={img._id+"-star-2"} starValue="2" starInnerText={labelText[2]} rating={img.rating}/>
             <RatingStar  id={img._id+"-star-3"} starValue="3" starInnerText={labelText[3]} rating={img.rating}/>
             <RatingStar  id={img._id+"-star-4"} starValue="4" starInnerText={labelText[4]} rating={img.rating}/>
             <RatingStar  id={img._id+"-star-5"} starValue="5" starInnerText={labelText[5]} rating={img.rating}/>
        </form>
    )
}

export default RatingForm
