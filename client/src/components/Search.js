import React, { useRef } from 'react'
import { useGlobalContext } from '../context'
console.count('context - formA')


const Search = () => {
    const { location, setLocation, setLoading } = useGlobalContext();
    const input = useRef('');
    console.count('context - formB')

    const handleSubmit = (e) => {
        console.count('context - formC')
        e.preventDefault();
        console.count('form - set location')
        console.log("******************", e, '***********', location, "************")
        console.log(input.current.value)
        if (input.current.value !== '' && input.current.value !== location) {
            setLoading(true);
            setLocation(input.current.value)
        }
    }

    return (
        <section className='search'>
            <form className='loc-search' onSubmit={handleSubmit}>
                <label htmlFor="test">Enter a Location: </label>
                <input type="text" id="test" name="test" ref={input} required/>
                <button type='submit'>Find Location</button>
            </form>
        </section>
    )
}

export default Search
