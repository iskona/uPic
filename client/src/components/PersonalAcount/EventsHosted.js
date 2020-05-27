import React, { useEffect, useState } from "react"
import API from "../../utils/API";
import "../../Style/EventsHosted.css";
import update from 'react-addons-update';
import UpdateContestForm from "./updateContestForm";

function EventsHosted() {
//To store all contest by user
    const [constestDetails, setContestDetails] = useState([]); 

    const [detail, setDetail] = useState("");               //to store data of each contest

    const [contestform, setcontestformt] = useState(false);//To hide&show component

    useEffect(() => {
        API.getContestByEmail().then(result => {
            console.log(result.data);
            setContestDetails(result.data)

        })
    }, [])

    //Function to fetch contest details based on ID
    const handlHideShow = (event) => {
        setcontestformt(true);
        console.log(event.target.getAttribute('custom-attribute'))
        var id = event.target.getAttribute('custom-attribute')
        // API.getContestByID(id).then(result =>{console.log(result.data)
        setDetail(id);
        // })
    }
    const setDescriptionDetails = (childevent) => {
        setcontestformt(false)
     
        console.log(childevent);
        var index = constestDetails.findIndex(contest => contest.id === childevent.id)
        console.log(childevent);

        setContestDetails(update(constestDetails,{
           [index]: {
                $set: childevent
             }
        }));
    }
    return (
        <section className = "maneDiv">
        <div>
           
         <br></br>
            {contestform ? <UpdateContestForm
                id={detail}
                setDescriptionDetails={setDescriptionDetails}
            /> : (
                    <div className="container tabelDiv mt-5">
                        <table className="table  table-hover hostEventTable table-condensed">
                            {/* <p>{constestDetails.title}</p> */}
                            <thead className="thead">
                                <tr>
                                    <th className="col" style={{ width: "15%" }}>Name</th>
                                    <th className="col" style={{ width: "15%" }}> Date </th>
                                    <th className="col" style={{ width: "20%" }} > Status </th>
                                    <th className="col"  style={{ width: "5%" }} > Edit </th>
                                </tr>
                            </thead>
                            <tbody>
                                {constestDetails.length ? constestDetails.map(item => (
                                    <tr key={item.id}>
                                        <td data-th="Name" className="name-cell align-middle">{item.title} </td>
                                        <td data-th="Email" className="align-middle" >{item.startdate.substring(0, 10)}</td>
                                        <td data-th="Phone" className="align-middle">{item.status}  </td>
                                       <td>{item.status === "Open" &&  <button custom-attribute={item.id} onClick={handlHideShow} >
                                            <i custom-attribute={item.id} className="fa fa-pencil" aria-hidden="true"></i>
                                        </button> }</td> 
                                       
                                    </tr>
                                )) : (<tr><td></td><td>No result to display</td></tr>)}
                            </tbody>

                        </table>

                    </div>
                )}
                    </div>
   </section>
    
     
    )
}
export default EventsHosted;