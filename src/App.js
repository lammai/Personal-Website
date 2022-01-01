import React from 'react';
import Navbar from './components/Navbar/Navbar';
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Routes,
} from 'react-router-dom';
import Home from './components/HomePage/Home';
import { Gallery } from './components/Gallery';
import { Projects } from './components/Projects';
import { About } from './components/About';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/projects' exact element={<Projects />} />
        <Route path='/gallery' exact element={<Gallery />} />
        <Route path='/about' exact element={<About />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
