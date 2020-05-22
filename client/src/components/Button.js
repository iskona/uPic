import React from 'react'

function Button({classNames, onClickHandler, label }) {
    return (
        <button
            className={classNames}
            onClick={onClickHandler}
        >{label}</button>
    )
}

export default Button
