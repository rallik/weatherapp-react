import React, { useState, useEffect }from 'react'
// import Header from "./components/Header";
// import Nav from "./components/Nav";
// import Form from "./components/Form";
// import Display from "./components/Display";


const Testing = () => {
  const city = 'boston,usa';
  const KEY = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`;

  const [loading, setLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({})
  
  const getWeather = async () => {
    // setLoading(true)
    try {
      const response = await fetch(url);
      const weather = await response.json();
      console.log(weather)
    } catch (error) {
      console.error('error', error)
    }
    
    // setCurrentWeather(weather)
    // setLoading(false)
  }

  useEffect(() => getWeather(), [])

  return 'hello world';
}


const App = () => {
  return (
    <React.Fragment>
      {/* <Header />
      <Nav />
      <Form />
      <Display /> */}
      <Testing/>
    </React.Fragment>
  )
}

export default App
