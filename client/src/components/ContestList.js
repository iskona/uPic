import React, { useState, useEffect } from 'react'
import API from "../utils/API";
import Title from './Title';
import ShowContestPage from "./ShowContestPage";
import "../Style/Events.css";
import ContestContent from './ContestContent';
import ShowWinnerPage from './ShowWinnerPage';

function ContestList() {
    const [contests, setContests] = useState([]);
    const [closedContests, setClosedContests] = useState([]);
    const [eachContest, setEachContest] = useState({});
    const [viewClicked, setViewClicked] = useState(false);
    const [viewWinners, setViewWinners] = useState(false);

    useEffect(() => {
        API.getOpenContests()
            .then(res => {
                console.log(res.data);
                setContests(res.data);
            })
            .catch(err => console.log(err))
    }, []);
    useEffect(() => {
        API.getClosedContests()
            .then(res => {
                console.log(res.data);
                setClosedContests(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    const contestDetails = (contest) => {
        console.log(contest);
        setEachContest(contest);
        setViewClicked(true);
    }

    const winnerDetails = (contest) => {
        setViewWinners(true);
        setEachContest(contest)
    }

    const backToContest = () => {
        setViewClicked(false);
        setViewWinners(false);
    }

    return (
        <div className="bgCover">
            <div className="container p-5">
                {!viewWinners && !viewClicked &&
                    <div className="jumbotron mt-5 p-5 mx-auto justify-content-center">
                        <Title title="Happening Contests" displaySize="5" />
                        <small>Click to upload and rate the pictures !!</small>
                        <br /><br />
                        {contests.length ? (
                            <div className="list-overflow-container">
                                <div className="row">
                                    {contests.map(contest => {
                                        console.log(contest.status)
                                        const isOpen = (contest.status === "open") ? true : false;
                                        if (isOpen) {
                                            console.log(contest.title + " Contest is Going on");
                                            return (
                                                <div className="col-lg-4 col-md-6 mb-4" key={contest._id}>
                                                    <ContestContent contest={contest} contestDetails={contestDetails} buttonLabel="View" />
                                                </div>
                                            )
                                        }
                                    }
                                    )}
                                </div>
                            </div>
                        ) : (
                                <h3>No Results have found</h3>
                            )
                        }
                        <br />
                        <Title title="Past Contests" displaySize="5" />
                        <small>click to view the winners!!</small>
                        <br /><br />
                        {closedContests.length ? (
                            <div className="list-overflow-container">
                                <div className="row">
                                    {closedContests.map(contest => {
                                        console.log(contest.status)
                                        const isClosed = (contest.status === "Closed") ? true : false;
                                        if (isClosed) {
                                            console.log(contest.title + " Contest is Going on");
                                            return (
                                                <div className="col-lg-4 col-md-6 mb-4" key={contest._id}>
                                                    <ContestContent contest={contest} contestDetails={winnerDetails} buttonLabel="Winners" />
                                                </div>
                                            )
                                        }
                                    }
                                    )}
                                </div>
                            </div>
                        ) : (
                                <h3>No Results have found</h3>
                            )
                        }
                    </div>

                }
                {viewClicked && <ShowContestPage backToContest={backToContest} contestData={eachContest} />}
                {viewWinners && <ShowWinnerPage backToContest={backToContest}  contestData={eachContest}/>}
            </div>
        </div>
    )
};

export default ContestList;