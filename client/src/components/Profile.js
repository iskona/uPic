import React, { useState, useEffect } from "react";
import "../Style/profile.css"
import Unsplash, { toJson } from 'unsplash-js';


function Profile() {

    const [images, setImages] = useState([]);
    // const unsplash = new Unsplash({ accessKey: "5DMWN47D_QB7GWHov8gtgQqXcz_-lnkLF4NC7hYPjFM" });
    const unsplash = new Unsplash({ accessKey: process.env.REACT_APP_Unsplash_Key });
    const categories = ["nature","pets","wildlife","food","family","world","water","sports","random"];
    var index = Math.floor(Math.random() * categories.length) + 1;

    useEffect(() => {
        //load random images
        unsplash.search.photos(categories[index], 1, 8, { orientation: "portrait" })
            .then(toJson)
            .then(json => {
                // Your code
                console.log(json.results)
                setImages(json.results);
            });
    }, []);

    return (
        <div className="container jumbotron mt-2">
            <div className="row">
                {images.map((img, i) => {
                    return <div className="col-lg-3 col-md-4 col-sm-6 border" key={i}>
                        <a href={img.urls.regular} className="thumbnail">
                            <img src={img.urls.thumb} />
                        </a>
                    </div>
                })}

            </div></div>

    )

}
export default Profile;