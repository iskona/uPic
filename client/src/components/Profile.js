import React from "react";
import "../Style/profile.css"


function Profile() {
   
    return(
        <div>
            <div className="Container" >
                <div className="feed">
                    <div className="activityCard" >
                        <div className="cardDiv">
                            <div className="row activity-card-Header " role="heading">
                                <h4>Hearts</h4>
                            </div>
                            <img className="pic" src="Images/image2.jpg" alt="deep" />
                            <br />
                            <h4>By :</h4>
                            <br />
                            <div className="imagefooter"><hr></hr><p>footer</p></div>
                        </div>

                    </div>
                </div>
            </div>
          
            
           </div>
    )

}
export default Profile;