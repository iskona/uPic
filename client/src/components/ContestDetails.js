import React from 'react'

function ContestDetails({contestData, showUpload}) {
    return (
        <div>
              <h3>{contestData.title}</h3>
             <p>{contestData.description}</p>
             <p>Host: {contestData.owner}</p>
            <p>Due on: {contestData.duedate}</p>
            {!showUpload && <p>Wanna Participate !!?</p>}
        </div>
    )
}

export default ContestDetails
