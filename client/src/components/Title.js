import React from 'react'

function Title({ title, displaySize }) {
    return (
        // className={`container${props.fluid ? "-fluid" : ""}`}
        <h2 className={`display-${displaySize} text-secondary`}>{title}</h2>

    )
}

export default Title
