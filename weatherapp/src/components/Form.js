import React, { useRef } from 'react'
import { useGlobalContext } from '../context'



const Form = () => {
    const input = useRef(null)
    const { setLocation } = useGlobalContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(input.current.value)
        setLocation(input.current.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="test">Enter a Location: </label>
            <input type="text" id="test" name="test" ref={input}/>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default Form
