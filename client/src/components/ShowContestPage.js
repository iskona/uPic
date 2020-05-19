import React,{useState} from 'react'
import UploadImage from './UploadImage'
import ContestDetails from "./ContestDetails";

function ShowContestPage({backToContest, contestData}) {
    const [ showUpload, setShowUpload ] = useState(false);
    const handleUpload = () => {
        setShowUpload(!showUpload);
    }

    let buttonLabel = showUpload ? "Done" : "Upload a Pic ";
    return (
        <div className="jumbotron border container" style={{width:"90%"}}>
           <ContestDetails contestData={contestData} showUpload={showUpload}/>
           {showUpload && <UploadImage contestid={contestData._id}/>}
          <div className="d-flex justify-content-center">
            <button 
            className="mx-auto border btn btn-primary"
            onClick={handleUpload}
            >{buttonLabel}</button></div>
         <br /><br />
         
         <button
                className="mt-1  btn btn-primary"
                onClick={backToContest}>
                    Contests
            </button>

      </div>
    )
}

export default ShowContestPage
