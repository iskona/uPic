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
            status : state.status
        }).then(result => {
            console.log("record updated");
            props.setDescriptionDetails(result.data)
        })
    }
    return (
        <React.Fragment>
            <div className="contestDetailsDiv">
                <h3 className="form-title text-center">Contest Details</h3>
                <hr></hr>
                <form className="contestFormDiv">
                    <div className="form-group row justify-content-center contestFormInput">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
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
                        <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10 ">
                            <input type="text"
                                name="description"
                                value={state.description}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Tell us something about the contest"
                            />
                        </div>
                    </div>
                    <div className="form-group row contestFormInput">
                        <label htmlFor="description" className="col-sm-2 col-form-label">Category</label>
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
                        <label htmlFor="endDate" className="col-sm-2 col-form-label">Due Date</label>
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
                        <label htmlFor="description" className="col-sm-2 col-form-label">Status</label>
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