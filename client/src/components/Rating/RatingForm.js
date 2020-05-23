import React,{useState, useEffect} from 'react'
import "../../Style/RatingForm.css";
import RatingStar from './RatingStar';
import API from "../../utils/API";

function RatingForm({ img, i, contestId}) {

const [rating, setRating] = useState(0);
const [newRating, setNewRating ] = useState(0);

const ratingUpdateHandler = (new_rating) => {
    console.log("Updated Rating "+new_rating);
    setNewRating(new_rating);
}
    useEffect(()=>{
        //get rating value for this particular image id, contest id and user combination from ratings collection
        getRatingFromDb();
    },[newRating]);

    
    function getRatingFromDb() {
        API.getRating(img._id, contestId, localStorage.getItem("email"))
            .then(dbData => {
                console.log(dbData.data[0].rating);
                const rating_val = dbData.data[0].rating;
                if (rating_val > 0) {
                    setRating(rating_val);
                }
                // setRating()
            })
            .catch(err => console.log(err));
    }

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
             <RatingStar  id={img._id} starValue="1" starInnerText={labelText[1]} rating={rating} contestId={contestId}
                          ratingUpdateHandler={ratingUpdateHandler}/>
             <RatingStar  id={img._id} starValue="2" starInnerText={labelText[2]} rating={rating} contestId={contestId}
                          ratingUpdateHandler={ratingUpdateHandler}/>
             <RatingStar  id={img._id} starValue="3" starInnerText={labelText[3]} rating={rating} contestId={contestId}
                          ratingUpdateHandler={ratingUpdateHandler}/>
             <RatingStar  id={img._id} starValue="4" starInnerText={labelText[4]} rating={rating} contestId={contestId}
                          ratingUpdateHandler={ratingUpdateHandler}/>
             <RatingStar  id={img._id} starValue="5" starInnerText={labelText[5]} rating={rating} contestId={contestId}
                          ratingUpdateHandler={ratingUpdateHandler}/>
        </form>
    )

}

export default RatingForm
