import React from 'react'
import { Link } from 'react-router-dom'

function ImagePage(props) {
    const {imageUrl} = props.location.state
    return (
        <div style={{backgroundColor:"#161618",height: "100vh"}} className="p-3">
            Image page
            <br />
            <Link to={{
                pathname:"/contests"
            }} className="float-right" >Back to Contests</Link>
            <br />
            <img src={imageUrl} alt=""></img>
        </div>
    )
}

export default ImagePage
