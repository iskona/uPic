import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import "../../Style/participation.css"
function Participation() {

    const [personalImages, setPerosnalImages] = useState([])

    useEffect(() => {
        API.getPersonalImages()
            .then(result => {
                console.log(result.data);
                setPerosnalImages(result.data)
            })
    }, [])


    return (
        <React.Fragment>
            <div className="participationDiv" >
                <div className="personalImageDiv"></div>
                    {personalImages.map(item => {
                        return (<div class="col-1-4">
                        <img src={item.imageUrl} alt=""/>
                      </div>)



                    })}
              
            </div>
        </React.Fragment>
    )
}
export default Participation;