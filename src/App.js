import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './components/HomePage/Home';
import { Gallery } from './components/Gallery';
import { Projects } from './components/Projects';

function App() {
    return (
        <HashRouter>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/projects" exact element={<Projects />} />
                <Route path="/gallery" exact element={<Gallery />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
