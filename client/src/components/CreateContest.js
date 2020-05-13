import React, { useRef, useState, useEffect } from 'react'
import API from "../utils/API";

function Contest() {
    const [contests, setContests] = useState([]);
    useEffect(() => {
        API.getContests()
            .then(res => {
                console.log(res.data);
                setContests(res.data);
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div className="container p-5">
            <div className="jumbotron mt-5 p-5 w-50 mx-auto justify-content-center">
                <h2>Photo Contests List</h2>
            </div>
            {contests.length ? (
                <div className="list-overflow-container">
                    <ul className="list-group">
                        {contests.map(contest => (
                            <li className="list-group-item" key={contest._id}>
                                <h3>
                                    <strong>
                                        {contest.title} by {contest.owner}
                                    </strong>
                                </h3>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                    <h3>No Results to Display</h3>
                )
            }
        </div >
    )
}

export default Contest;