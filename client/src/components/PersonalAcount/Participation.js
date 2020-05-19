import React from "react";

function Participation(){
    return (
        <div className="container mt-5">
            <table className="table table-striped table-hover table-condensed">
                <thead className="thead">
                    <tr>
                        <th className="col" style={{ width: "15%" }}>Name</th>
                        <th className="col" key="Name" style={{ width: "15%" }}>Date</th>
                        <th className="col" key="DOB" style={{ width: "20%" }} >Status</th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}
export default Participation;