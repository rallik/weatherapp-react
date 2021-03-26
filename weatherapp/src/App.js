import React from 'react'
import Header from "./components/Header";
// import Nav from "./components/Nav";
import Form from "./components/Form";
import Display from "./components/Display";


const App = () => {
  return (
    <React.Fragment>
      <Header />
      {/* <Nav /> */}
      <Form />
      <Display />
    </React.Fragment>
  )
}

export default App
