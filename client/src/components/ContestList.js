import React, { useState, useEffect } from 'react'
import API from "../utils/API";
import Title from './Title';
import ShowContestPage from "./ShowContestPage";

function ContestList() {
    const [contests, setContests] = useState([]);
    const [eachContest, setEachContest] = useState({});
    const [viewClicked, setViewClicked ] = useState(false);

    useEffect(() => {
        API.getContests()
            .then(res => {
                console.log(res.data);
                setContests(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    const contestDetails = (contest) => {
      console.log(contest);
      setEachContest(contest);
      setViewClicked(true);
    }

    const backToContest = () => {
        setViewClicked(false);
    }

    return (
        <div className="container p-5">
         {!viewClicked &&   <div className="jumbotron mx-auto justify-content-center">
                <Title title="Photo Contest List" displaySize="5" />
                <br />
                {contests.length ? (
                    <div className="list-overflow-container">
                        <div className="row row-cols-1 row-cols-md-3">
                            {contests.map(contest => (
                                <div className="col mb-4" key={contest._id}>
                                    <div className="card h-100 border-secondary" style={{ "maxWidth": "18rem" }}>
                                        <div className="card-body">
                                            <h5 className="card-title">{contest.title}</h5>
                                            <p className="card-text">{contest.description}</p>
                                        </div>
                                        <div className="card-footer">
                                            <a href="/about" 
                                               className="btn btn-primary"
                                               onClick={(e) => {
                                                                e.preventDefault();
                                                                contestDetails(contest);
                                                                }}>
                                                View
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                        <h3>No Results to Display</h3>
                    )
                }
            </div>}
            {viewClicked && <ShowContestPage backToContest={backToContest} contestData={eachContest}/>}
        </div>
    )
}

export default ContestList;