import React from 'react'
import { useGlobalContext } from '../context'



const Error = () => {
    const { setLoading } = useGlobalContext()
    console.count('error');
    setLoading(false);
    return (
        <section>
            Please select a valid location
        </section>
    )
}

export default Error
