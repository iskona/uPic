import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import "../../Style/participation.css"
function Participation() {

    const [participationDetails, setparticipationDetails] = useState([])

    useEffect(() => {
        API.getPersonalImages()
            .then(result => {
                console.log(result.data);
                setparticipationDetails(result.data)
            })
    }, [])


    return (
        <section className = "maneDiv">
            <br></br>
            <div className="participationDiv" >
            <div className="container tabelDiv  participationDiv mt-5">
                        <table className="table  table-hover participationTable table-condensed">
                            {/* <p>{constestDetails.title}</p> */}
                            <thead className="thead">
                                <tr>
                                    <th className="col" style={{ width: "15%" }}>Name</th>
                                    <th className="col" style={{ width: "15%" }}>Date</th>
                                    <th className="col" style={{ width: "20%" }}>Status</th>
                                    <th className="col"  style={{ width: "5%" }}> Picture Uploaded</th>
                                </tr>
                            </thead>
                            <tbody>
                                {participationDetails.length ? participationDetails.map(item => (
                                    <tr key={item.image.contestId}>
                                        <td  className="name-cell align-middle">{item.contest.title} </td>
                                        <td  className="align-middle">{item.contest.startdate.substring(0, 10)}  </td>
                                        <td  className="align-middle">{item.contest.status}  </td>
                                        <td  className="align-middle" >
                                           <a href = {item.image.imageUrl}   target = "_blank"> <img  classname ="participationThumbnail" src = {item.image.thumbnailUrl}  /> </a>
                                            </td>
                                    </tr>
                                )) : (<tr><td></td><td>No result to display</td></tr>)}
                            </tbody>

                        </table>

                    </div>
              
            </div>
        </section>
    )
}
export default Participation;