import React, {useState, useEffect} from 'react'
import Masonry from 'react-masonry-component';
import { masonryOptions } from "./ImageMasonryComponent";
import ImageLink from './ImageLink';
import RatingForm from './Rating/RatingForm';


function ImageGrid({images, contestId, showRating}) {

    const [showRatingForm, setShowRatingForm] = useState(false);
    useEffect(()=>{
        if(showRating){
            setShowRatingForm(true);
        }
    },[])
    return (
        <>
              <Masonry
                className={"grid"}
                elementType={"div"}
                options={masonryOptions}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}
            >
                {images.map((img, i) => {
                    return (
                        <div className="pb-0" style={{backgroundColor:"rgb(108,117,125)"}} key={i}>
                            <ImageLink imageUrl={img.imageUrl} thumbnailUrl={img.thumbnailUrl}/>
                           {showRatingForm && <RatingForm img={img} i={i} contestId={contestId}/>}
                        </div>
                    )
                })}
            </Masonry>

        </>
    )
}

export default ImageGrid
