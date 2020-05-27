import React, { useEffect, useState } from "react";
import "../../Style/ContestForm.css"
import API from "../../utils/API";


function UpdateContestForm(props) {
    console.log(props)

    const [state, setState] = useState({
        title: "",
        description: "",
        category: "",
        status: "",
        dueDate: ""
    })

    //To pre-populate form with contest details.
    useEffect(() => {
        API.getContestByID(props.id).then(result => {
            console.log(result.data)
            setState({
                title: result.data.title,
                description: result.data.description,
                category: result.data.category,
                status: result.data.status,
                dueDate: result.data.duedate
            });
        })
    }, [])

    // Category list
    const categoriesList = ["Portrait", "Still Life", "Landscape", "Food", "Wildlife", "Macro", "Event",
        "Fashion", "Newborn", "Street", "Sports", "Documentary", "Weather", "Architectural"]

    //Status List
    const contsetStatusList = ["Open", "Closed"]

    //Function to detect input change.
    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }
    // Function to submit update form.
    const handleUpdate = (event) => {
        event.preventDefault();
        API.updateContestDetails(props.id, {
            title: state.title,
            description: state.description,
            category: state.category,
            duedate: state.dueDate,
            status: state.status
        }).then(result => {
            console.log("record updated");
            console.log(result.data)

            props.setDescriptionDetails(result.data)
            if (result.data.status === "Closed") {
                console.log("CONTEST IS DONE ");
                //make an api call to calculate the image's average rating and updating the rating for each image in images table.
                API.getAverageRating(result.data._id)
                    .then(dbData => {
                        console.log(dbData.data)
                        const contestId = dbData.data[0].contest_id;
                        const images = dbData.data;
                        /******
                         *  another way of getting distinct image ids 
                            const filtered = images.map(image => image.image_id)
                                   .filter((value, index, self) => self.indexOf(value) === index);
                            console.log(filtered) 
                            ***********/
                        var unique = [];
                        var distinct = [];
                        for (let i = 0; i < images.length; i++) {
                            if (!unique[images[i].image_id]) {
                                distinct.push(images[i].image_id);
                                unique[images[i].image_id] = 1;
                            }
                        }
                        var ratingsArr = [];
                        for (let i = 0; i < distinct.length; i++) {
                            var eachImage = images.filter(function (image) {
                                return image.image_id == distinct[i];
                            });
                            //find the average of all the ratings
                            var sum_rating = 0;
                            for (let j = 0; j < eachImage.length; j++) {
                                sum_rating += eachImage[j].rating;
                            }
                            var avg_rating = sum_rating / eachImage.length;

                            console.log('==== avg rating of ' + distinct[i] + " is " + Math.floor(avg_rating));
                            var imagekey = distinct[i], ratingVal = Math.floor(avg_rating);
                            var obj = {};
                            obj[imagekey] = ratingVal;
                            ratingsArr.push(obj);
                        }

                        const contestRatings = {
                            contest_id: contestId,
                            ratingsArr: ratingsArr,
                            owner: localStorage.getItem("email")
                        }

                        API.updateAverageRating(contestRatings)
                            .then(dbResponse => console.log(dbResponse))
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            }
        })
    }
    return (
        <React.Fragment>
            <div className="contestUpdateDetailsDiv">
                <h3 className="form-title text-center">Update Contest</h3>
                <hr></hr>
                <br></br>
                <form className="UpdateFormDiv">
                    <div className="form-group row justify-content-center contestFormInput">
                        <label htmlFor="title" className="col-sm-2 col-form-label updateLabel">Title</label>
                        <div className="col-sm-10 ">
                            <input type="text"
                                name="title"
                                value={state.title}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Contest Title"
                            />
                        </div>
                    </div>
                    <div className="form-group row contestFormInput">
                        <label htmlFor="description" className="col-sm-2 col-form-label updateLabel">Description</label>
                        <div className="col-sm-10 ">
                            {/* <input type="text"
                                name="description"
                                value={state.description}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Tell us something about the contest"
                            /> */}

                            <textarea className="form-control" rows="3"
                                name="textarea" value={state.description}
                                onChange={handleChange}
                                placeholder="Tell us something about the contest"
                                name="description">
                            </textarea>
                        </div>
                    </div>
                    <div className="form-group row contestFormInput">
                        <label htmlFor="description" className="col-sm-2 col-form-label updateLabel">Category</label>
                        <div className="col-sm-10 ">
                            <select className="form-control" name="category"
                                value={state.category}
                                onChange={handleChange}
                            >
                                {categoriesList.map(item => {
                                    return <option key={item + "2"}>{item}</option>
                                })}
                            </select>

                        </div>
                    </div>
                    <div className="form-group row contestFormInput">
                        <label htmlFor="endDate" className="col-sm-2 col-form-label updateLabel">DueDate</label>
                        <div className="col-sm-10 ">
                            <input type="date"
                                name="duedate"
                                // value = {state.dueDate}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Tell us something about the contest"
                            />
                        </div>
                    </div>
                    <div className="form-group row contestFormInput">
                        <label htmlFor="description" className="col-sm-2 col-form-label updateLabel">Status</label>
                        <div className="col-sm-10 ">
                            <select className="form-control" name="status"
                                value={state.status}
                                onChange={handleChange}
                            >
                                {contsetStatusList.map(item => {
                                    return <option key={item}>{item}</option>
                                })}
                            </select>

                        </div>
                    </div>

                    < div className="row">
                        <button
                            className="btn btn-default contestSaveButton"
                            onClick={handleUpdate}
                        >Update Contest</button>
                    </div>
                </form>
            </div>




        </React.Fragment>

    )
}
export default UpdateContestForm;