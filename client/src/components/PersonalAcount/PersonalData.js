import React, { useState, useEffect } from "react";
import "../../Style/PersonalData.css";
import AdditionalInfo from "./AdditionalInfo";
import Masonry from 'react-masonry-component';
import { masonryOptions } from "../ImageMasonryComponent";
import API from "../../utils/API";
import { Link } from 'react-router-dom';


function PersonalData(props) {
    console.log(props)
    const [InfoComponent, setInfoComponent] = useState(false);
    const [userDescription, setComponenetUserInfo] = useState(props.userInfo.description || "Tell us something about yourself");
    const [galleryImage, setGalleryImage] = useState([]);

    const showInfoComponent = () => {
        setInfoComponent(!InfoComponent);
    }

    useEffect(() => {
        API.getPersonalImages().then(result => {
            console.log(result.data);
            setGalleryImage(result.data);
        })
    }, [])

    const setDescription = (description) => {
        setComponenetUserInfo(description); 
        setInfoComponent(false);
    }

    return (
        <section className = "maneDiv">
         <br></br>
        <div className="personalDetailsDiv col-12">
            <div className="description desc-empty">
                {!InfoComponent && <i className=" descriptionBox empty-description-handler">{userDescription}</i>}
                {InfoComponent && <AdditionalInfo setDescription={setDescription} Desc={userDescription} />}
                {!InfoComponent && <button onClick={(showInfoComponent)} className="Fafa-pencil">
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>}
            </div>
            <div className="nameDiv">
                <div className="row">
                    <div className="col-2 text-muted"> Name </div>
                    <div className="col-2 "> {props.userInfo.name} </div>
                    <div className="col-6" />
                </div>
                <br></br>
                <div className="row">
                    <div className="col-2 text-muted"> Email </div>
                    <div className="col-2 "> {props.userInfo.email} </div>
                    <div className="col-6" />
                </div>

            </div>
            <div className="galleryDiv">
                <h6 id = "h5Div">Gallery</h6>
                <br></br>
                <Masonry  
                className={"grid"}
                elementType={"div"}
                options={masonryOptions}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false} >

                {galleryImage.map((img ,i) =>{
                  return(
                    <div key={i}>
                    <img
                        className="personalGalleryImg"
                        src={img.image.thumbnailUrl}
                        alt="Contest images" />
                    
                </div>
                
                  ) 
            
        }
        )}
         
                </Masonry>
            </div>
        </div>
        </section>

    )

}
export default PersonalData;