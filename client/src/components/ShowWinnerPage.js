import React,{useEffect,useState} from 'react'
import Button from './Button';
import API from '../utils/API';
import ImageGrid from './ImageGrid';

function ShowWinnerPage({ backToContest, contestData }) {

    const [images, setImages] = useState([]);

    console.log("Contest Details "+contestData.title)
    useEffect(() => {
        //load the images from the database on page load
        API.getImageDetails(contestData._id)
            .then(res => {
                console.log(res.data);
                setImages(res.data);
            })
            .catch(err => console.log(err));
    },[]);
    return (
        <div>
            <h1>{contestData.title}</h1>
            <ImageGrid images={images} contestId={contestData._id} showRating={false}/>
            <Button classNames="mt-1 btn btn-primary" onClickHandler={backToContest} label="Contests" />
        </div>
    )
}

export default ShowWinnerPage
