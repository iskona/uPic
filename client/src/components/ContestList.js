import React, { useState, useEffect } from 'react'
import API from "../utils/API";
import Title from './Title';

function CreateContest() {
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
            <Title title="Contests" displaySize="4"/>
           
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
                <Title title="No Results to Display !!" displaySize="6"/>
                )
            }
             </div>
        </div >
    )
}

export default CreateContest;