import React from 'react'

function FormInput({inputType, place_holder, inputRef}) {
    return (
        <input type={inputType}
        className="form-control mb-1"
        placeholder={place_holder}
        ref={inputRef} />
    )
}

export default FormInput
