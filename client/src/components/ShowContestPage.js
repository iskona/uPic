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
        <div className="jumbotron mx-auto" style={{width:"90%"}}>
           <ContestDetails contestData={contestData} showUpload={showUpload}/>
           {showUpload && <UploadImage contestid={contestData._id}/>}
            <button
            onClick={handleUpload}
            >{buttonLabel}</button>
         <br />
         
         <button
                className="mt-1 float-right"
                onClick={backToContest}>
                    Contests
            </button>
         
         
      </div>
    )
}

export default ShowContestPage
