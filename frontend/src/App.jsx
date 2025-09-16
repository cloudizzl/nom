import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Navbar from './components/Navbar'
import "./styles/global.css"
import './styles/variables.css';
import LoginPage from "./pages/LoginPage";
import {AuthProvider} from "./components/AuthContext";
import TimelinePage from "./pages/TimelinePage";
import Register from "./pages/Register";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar/>

                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/timeline" element={<TimelinePage/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>

            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
