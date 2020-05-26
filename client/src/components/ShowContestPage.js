import React, { useState, useEffect } from 'react'
import UploadImage from './UploadImage'
import ContestDetails from "./ContestDetails";
import Button from './Button';
import API from '../utils/API';
import Title from './Title';
import ImageGrid from './ImageGrid';

function ShowContestPage({ backToContest, contestData }) {

    const [showUpload, setShowUpload] = useState(false);
    const [images, setImages] = useState([]);
    const [relaodImages, setReloadImages] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [participated, setParticipated] = useState(false);

    const handleUpload = () => {
        //check if the user has already participated in this contest 
        API.checkUserParticipation(localStorage.getItem("email"), contestData._id)
            .then(res => {
                console.log(res.data.length);
                if (res.data.length > 0) {
                    console.log("Particpated")
                    setParticipated(true);
                } else {
                    console.log("Not Participated ")
                    setParticipated(false);
                }
            }).catch(err => console.log(err));
        setShowUpload(!showUpload);
    };

    const relaodTheComponet = () => {
        setReloadImages(!relaodImages);
    }

    const hideUploadButton = () => {
        setUploaded(true);
    }
    useEffect(() => {
        //load the images from the database on page load
        API.getImageDetails(contestData._id)
            .then(res => {
                console.log(res.data);
                setImages(res.data);
            })
            .catch(err => console.log(err))
    }, [relaodImages]);

    return (

        <div className="jumbotron border m-1">

            <ContestDetails contestData={contestData} showUpload={showUpload} />

            {/* Display Images grid, which are already added to the contest by all the other users */}
            <ImageGrid images={images} contestId={contestData._id} showRating={true}/>

            {showUpload && !participated && 
                <UploadImage contestid={contestData._id} relaodTheComponet={relaodTheComponet} hideUploadButton={hideUploadButton} />}

            {!uploaded && !participated && 
                <div className="d-flex justify-content-center">
                    <Button classNames="mx-auto border btn btn-primary" onClickHandler={handleUpload} label="Upload a Pic" />
                </div>}

            {participated && <Title title="You have already uploaded a wonderul picture !!" displaySize="5" />}

            <br />

            <Button classNames="mt-1 btn btn-primary" onClickHandler={backToContest} label="Contests" />
        </div>

    )
}

export default ShowContestPage
