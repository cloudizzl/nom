import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Navbar from './components/Navbar'
import "./styles/global.css"
import './styles/variables.css';
import LoginPage from "./pages/LoginPage";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;
