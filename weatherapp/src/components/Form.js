import React, { useRef } from 'react'
import { useGlobalContext } from '../context'
console.count('context - formA')


const Form = () => {
    const { location, setLocation } = useGlobalContext();
    const input = useRef('');
    console.count('context - formB')

    const handleSubmit = (e) => {
        console.count('context - formC')
        e.preventDefault();
        console.count('form - set location')
        console.log("******************", e, '***********', location, "************")
        console.log(input.current.value)
        
        setLocation(input.current.value)
        
    }

    return (
        <form className='loc-search' onSubmit={handleSubmit}>
            <label htmlFor="test">Enter a Location: </label>
            <input type="text" id="test" name="test" ref={input}/>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default Form
