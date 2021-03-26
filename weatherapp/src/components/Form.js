import React, { useRef } from 'react'
import { useGlobalContext } from '../context'
console.count('context - formA')


const Form = () => {
    const { setLocation, setLoading } = useGlobalContext();
    const input = useRef(null);
    console.count('context - formB')

    const handleSubmit = (e) => {
        console.count('context - formC')
        e.preventDefault();
        console.count('form - set loading')
        setLoading(true)
        console.count('form - set location')
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
