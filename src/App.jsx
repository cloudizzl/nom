import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Navbar from './components/Navbar'
import "./styles/global.css"
import './styles/variables.css';
import LoginPage from "./pages/LoginPage";
import {AuthProvider} from "./components/AuthContext";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar/>

                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                </Routes>

            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
