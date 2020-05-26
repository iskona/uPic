import React from 'react'
import ContestContent from './ContestContent';

function ContestGrid({contests, contestDetails, buttonLabel}) {
    return (
        <div className="list-overflow-container">
        <div className="row">
            {contests.map(contest => {                
                    return (
                        <div className="col-lg-4 col-md-6 mb-4" key={contest._id}>
                            <ContestContent contest={contest} contestDetails={contestDetails} buttonLabel={buttonLabel} />
                        </div>
                    )
            }
            )}
        </div>
    </div>
    )
}

export default ContestGrid
