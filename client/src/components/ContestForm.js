import React, { useRef } from "react";
import "../Style/ContestForm.css"
import API from "../utils/API";
import uuid from 'react-uuid'
import Image12 from '../Style/Img/3.jpg';
function ContestForm() {

    // const bgStyle = {
    //     backgroundImage: "url(" + Image12 + ")"
    // }
    const categoriesList = ["Portrait", "Still Life", "Landscape", "Food", "Wildlife", "Macro", "Event",
        "Fashion", "Newborn", "Street", "Sports", "Documentary", "Weather", "Architectural"]

    const titleRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const dueDate = useRef();
    const handleSubmit = (event) => {
        event.preventDefault();
        API.createContestDetails({
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value.toLowerCase(),
            duedate: dueDate.current.value,
            id: uuid()
        }).then(
            res => {
                console.log(res.data)
                window.location.href = "/contests"

            })
            .catch(err => console.log(err));
    }
    return (
        <div className="contestFormMainDiv"  >
            <br></br>
            <div className=" container contestDetailsDiv" >
                <h3 className="form-title text-center">Contest Details</h3>
                <hr></hr>
                <form className="contestFormDiv">
                    <div className="form-group row justify-content-center contestFormInput">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-10 ">
                            <input type="text"
                                className="form-control contestTextArea "
                                placeholder="Contest Title"
                                ref={titleRef}
                            />
                        </div>
                    </div>
                    <div className="form-group row contestFormInput">
                        <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10 ">
                            <textarea  className="form-control contestTextArea" rows="3"
                                placeholder="Tell us something about the contest"
                                ref={descriptionRef}>
                          </textarea>
                        </div>
                    </div>
                    <div className="form-group row contestFormInput">
                        <label htmlFor="description" className="col-sm-2 col-form-label">Category</label>
                        <div className="col-sm-10 ">
                            <select className="form-control contestTextArea" ref={categoryRef}>
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
                                className="form-control contestTextArea"
                                placeholder="Tell us something about the contest"
                                ref={dueDate}
                            />
                        </div>
                    </div>

                    < div className="row">
                        <button
                            className="btn btn-default contestSaveButton"
                            onClick={handleSubmit}
                        >Post Contest</button>
                    </div>
                </form>
            </div>




        </div>

    )
}

export default ContestForm;