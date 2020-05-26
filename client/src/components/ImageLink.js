import React from 'react'
import { Link } from 'react-router-dom';

function ImageLink({imageUrl, thumbnailUrl}) {
    return (
        <Link to={{
            pathname:"/image",
            state:{
                imageUrl : imageUrl}
        }
        }> <img
        src={thumbnailUrl}
        style={{ width: 320 }}
        alt="Contest images" /> </Link>
    )
}

export default ImageLink
