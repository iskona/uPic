import React, { useState, useEffect } from 'react'
import API from '../utils/API';
import ContestGrid from './ContestGrid';
import ShowContestPage from "./ShowContestPage";

function SearchedContests(props) {
    console.log('--- searched --- ');
    console.log(props.location.state.searchVal);
    const [contests, setContests] = useState([]);
    const [eachContest, setEachContest] = useState({});
    const [viewClicked, setViewClicked] = useState(false);

    useEffect(() => {
        console.log('Searched for ' + props.location.state.searchVal);
        API.searchContests(props.location.state.searchVal)
            .then(res => {
                console.log(res.data);
                setContests(res.data);
            })
    }, [props.location.state.searchVal]);

    const contestDetails = (contest) => {
        console.log(contest);
        setEachContest(contest);
        setViewClicked(true);
    }

       
    const backToContest = () => {
        setViewClicked(false);
        // setViewWinners(false);
    }

    return (
        <div className="bgCover">
            <div className="container p-5">
                {!viewClicked && <div className="jumbotron mt-5 p-5 mx-auto justify-content-center">
                    {contests.length ? (
                        <ContestGrid contests={contests} contestDetails={contestDetails} buttonLabel="View" />
                    ) : (
                            <h3>No Results have found</h3>
                        )
                    }

                </div>}
                {viewClicked && <ShowContestPage backToContest={backToContest} contestData={eachContest} />}
            </div>


        </div>
    )
}

export default SearchedContests
