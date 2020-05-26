import React from 'react'

function ContestContent({contest, contestDetails, buttonLabel}) {
    return (
        <div className="card h-100 border-secondary" style={{ "maxWidth": "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{contest.title}</h5>
                <p className="card-text ">{contest.description}</p>
            </div>
            <div className="card-footer">
                <a href="/about"
                    className="btn btn-secondary"
                    onClick={(e) => {
                        e.preventDefault();
                        contestDetails(contest);
                    }}>
                    {buttonLabel}
            </a>
            </div>
        </div>
    )
}

export default ContestContent
