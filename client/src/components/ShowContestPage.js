import React, { useState, useEffect } from 'react'
// import "create-react-class";
import UploadImage from './UploadImage'
import ContestDetails from "./ContestDetails";
import Button from './Button';
import API from '../utils/API';

// import infiniteScroll from "react-masonry-component";
import Masonry from 'react-masonry-component';
import { masonryOptions } from "./ImageMasonryComponent";
import RatingForm from './Rating/RatingForm';

function ShowContestPage({ backToContest, contestData }) {
    const [showUpload, setShowUpload] = useState(false);
    const [images, setImages] = useState([]);



    const handleUpload = () => {
        setShowUpload(!showUpload);
    };

    useEffect(() => {
        //load the images from the database on page load
        API.getImageDetails(contestData._id)
            .then(res => {
                console.log(res.data);
                setImages(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    let buttonLabel = showUpload ? "Done" : "Upload a Pic ";
    return (
        <div className="jumbotron border " style={{ width: "90%" }}>
            <ContestDetails contestData={contestData} showUpload={showUpload} />
            {/* Display Images grid, which are already added to the contest by all the other users */}

            <Masonry
                className={"grid"}
                elementType={"div"}
                options={masonryOptions}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}
            >
                {images.map((img, i) => {
                    return (
                        <div key={i}>
                            <a href={img.imageUrl}> <img
                                src={img.thumbnailUrl}
                                style={{ width: 300 }}
                                alt="Contest images" /> </a>
                            <RatingForm img={img} i={i} />
                        </div>
                    )
                })}
            </Masonry>

            {showUpload && <UploadImage contestid={contestData._id} />}
            <div className="d-flex justify-content-center">
                <Button classNames="mx-auto border btn btn-primary" onClickHandler={handleUpload} label={buttonLabel} />
            </div>
            <br />
            <Button classNames="mt-1 btn btn-primary" onClickHandler={backToContest} label="Contests" />
        </div>
    )
}

export default ShowContestPage
