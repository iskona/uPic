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
        <div className="jumbotron">
           <ContestDetails contestData={contestData} showUpload={showUpload}/>
           {showUpload && <UploadImage />}
            <button
            onClick={handleUpload}
            >{buttonLabel}</button>
         <br />
            <button
                className="mt-1"
                onClick={backToContest}>
                    Contests
            </button>
      </div>
    )
}

export default ShowContestPage
