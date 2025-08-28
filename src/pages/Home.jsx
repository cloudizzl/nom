import React from 'react'
import Map from "../components/Map";
import Registration from "../components/Registration";
import SearchField from "../components/SearchField";
import FoodRating from "../components/FoodRating";
import RatingList from "../components/RatingList";


function Home() {
    return (
        <main>
            <RatingList />
            <h1>Willkommen auf der Home-Seite</h1>
            <Map />
        </main>
    )
}

export default Home
