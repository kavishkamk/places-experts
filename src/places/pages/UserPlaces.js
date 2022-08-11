import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../Components/PlaceList";

const DUMMY_PLACES = [
    {
        id: "p1",
        title: "Empire State Building",
        description: "One of the most famous sky scrapers in the world.!",
        imageUrl: "https://i.pinimg.com/474x/f5/08/16/f50816017bbead00daef61e007fe886e.jpg",
        address: "20 W 34th St., New York, NY 10001, United States",
        location: {lat: 40.7484405, lng: -73.9856644},
        creator: "u1"
    }, {
        id: "p2",
        title: "Empire State Building",
        description: "One of the most famous sky scrapers in the world.!",
        imageUrl: "https://i.pinimg.com/474x/f5/08/16/f50816017bbead00daef61e007fe886e.jpg",
        address: "20 W 34th St., New York, NY 10001, United States",
        location: {lat: 40.7484405, lng: -73.9856644},
        creator: "u2"
    },
];

const UserPlaces = () => {

    const userId = useParams().uid;

    return <PlaceList items={DUMMY_PLACES.filter((place) => place.creator === userId)} />
};

export default UserPlaces;