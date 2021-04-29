import React from 'react'
import Header from "./components/Header";
// import Nav from "./components/Nav";
import Form from "./components/Form";
import Display from "./components/Display";
import Map from './components/Map';
import './styles/App.scss'


const App = () => {
  return (
    <React.Fragment>
      <Header />
      {/* <Nav /> */}
      <main>
        <Form />
        <Display />
        <Map />
      </main>
    </React.Fragment>
  )
}

export default App
