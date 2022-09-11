import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../Components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserPlaces = () => {

    const {sendRequest, error, isLoading, clearError} = useHttpClient();
    const [places, setPlaces] = useState(null);
    const userId = useParams().uid;

    const placeDeletedHandler = (deletedPlaceId) => {
        setPlaces(previousPlaces => previousPlaces.filter(place => place.id !== deletedPlaceId));
    };

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(`places/users/${userId}`);
                setPlaces(responseData.places);
            } catch (error) {
            }
        }
        fetchPlaces();
    }, [sendRequest, userId]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && 
                <div className="center">
                    <LoadingSpinner />
                </div>
            }
            {!isLoading && places && <PlaceList items={places.filter((place) => place.creator === userId)} onDeletePlace={placeDeletedHandler} />}
        </React.Fragment>
    )
};

export default UserPlaces;