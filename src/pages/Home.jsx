import React from 'react'
import Map from "../components/Map";
import {useAuth} from "../components/AuthContext";
import {Navigate} from "react-router-dom";


function Home() {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return (
            <main>
                <h1>hi, you are currently logged out ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧</h1>
                <div className="text">
                    search for a food spot and rate it! (you need to be logged in for that)
                </div>
                <Map />
            </main>
        )
    }

    return (
        <main>
            <h1>hi, {currentUser.username}  ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧</h1>
            <div className="text">
                search for a food spot and rate it!
            </div>
            <Map />
        </main>
    )
}

export default Home
