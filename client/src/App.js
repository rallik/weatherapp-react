import React from 'react'
import Header from "./components/Header";
// import Nav from "./components/Nav";
import Search from "./components/Search";
import Display from "./components/Display";
import Map from './components/Map';
import './styles/App.scss'


const App = () => {
  return (
    <React.Fragment>
      <Header />
      {/* <Nav /> */}
      <main className='app'>
        <section className='search-data-display'>
          <Search />
          <Display />
        </section>
        <Map />
      </main>
    </React.Fragment>
  )
}

export default App
