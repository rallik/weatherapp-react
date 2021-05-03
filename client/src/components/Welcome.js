import React from 'react'

const Welcome = () => {
    console.count('welcome');
    return (
        <h2 className='welcome-msg'>
            Welcome to the weather app!
        </h2>
    )
}

export default Welcome
