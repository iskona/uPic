import React, { useEffect,useState } from "react"
import API from "../../utils/API";
// import { v4 as uuidv4 } from 'uuid';
import ContestForm from "../ContestForm"

function EventsHosted() {

    const [constestDetails, setContestDetails] = useState([]);
    const [contestform, setcontestformt] = useState(false);//To hide&show component
    useEffect(() => {
        API.getContestByEmail().then(result => {
            console.log(result.data);
            setContestDetails(result.data)

        })
    },[])

    const handlHideShow = () =>{
        setcontestformt(true);
    }

return (
        <div>
            {contestform ? <ContestForm /> :(
                <div className="container mt-5">
                <table className="table table-striped table-hover table-condensed">
                 <p>{constestDetails.title}</p>   
                    <thead className="thead">
                        <tr>
                            <th className="col" style={{ width: "15%" }}>Name</th>
                            <th className="col" key="Name" style={{ width: "15%" }}> Date </th>
                            <th className="col" key="DOB" style={{ width: "20%" }} > Status </th>
                            <th className="col" key="DOB" style={{ width: "5%" }} > Edit </th>
                        </tr>
                    </thead>
                    <tbody>
                        {constestDetails.length ? constestDetails.map(item => (
                            <tr key={item.id}>
                               <td data-th="Name" className="name-cell align-middle">{item.title} </td>
                                <td data-th="Email" className="align-middle" >{item.startdate.substring(0,10)}</td>
                                <td data-th="Phone" className="align-middle">{item.status} </td>
                                <button onClick = {handlHideShow}> 
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </button>
                            </tr>
                        )) : ( " No result to display" )}
                    </tbody>
    
    
                </table>
            </div>
            ) }
        
        </div>
    )
}
export default EventsHosted;