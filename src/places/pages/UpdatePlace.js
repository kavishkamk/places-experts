import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import "./PlaceForm.css";

const DUMMY_PLACES = [{
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world.!",
    imageUrl: "https://i.pinimg.com/474x/f5/08/16/f50816017bbead00daef61e007fe886e.jpg",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {lat: 40.7484405, lng: -73.9856644},
    creator: "u1"
}, {
    id: "p2",
    title: "Emp2 State Building",
    description: "One of the most famous sky scrapers in the world.!",
    imageUrl: "https://i.pinimg.com/474x/f5/08/16/f50816017bbead00daef61e007fe886e.jpg",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {lat: 40.7484405, lng: -73.9856644},
    creator: "u2"
},
];

const UpdatePlace = () => {
    const [isLoading, setIsLoading] = useState(true);
    const placeId = useParams().pid;

    const [formState, inputHandlere, setFormData] = useForm(
        {
            title: {
                value: "",
                isValid: false
            },
            description: {
                value: "",
                isValid: false
            }
        },
        false
    );

    const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId);
    
    useEffect(() => {
        if(!identifiedPlace) {
            setFormData(
                {
                    title: {
                        value: identifiedPlace.title,
                        isValid: true
                    },
                    description: {
                        value: identifiedPlace.description,
                        isValid: true
                    }
                },
                true
            );
        };
        setIsLoading(false);
    }, [setFormData, identifiedPlace]);

    const plaseUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState);
    };
    
    if (!identifiedPlace) {
        return (
            <div className="center">
                <h2>Could Not Find Place !</h2>
            </div>
        );
    };

    if(isLoading) {
        return (<
            div className="center">
                <h2>Loading...!</h2>
            </div>
        );
    };

    return (
        <form className="place-form" onSubmit={plaseUpdateSubmitHandler}>
            <Input 
                id="title"
                element="input"
                type="text"
                label="Title" 
                value={formState.input.title.value}
                validators={[VALIDATOR_REQUIRE()]}
                errorMsg="Please enter the valid title"
                onInput={inputHandlere}
                valid={formState.input.title.isValid}
            />
            <Input 
                id="description"
                label="Description" 
                value={formState.input.description.value}
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorMsg="Please Enter a valid Description. (Min. 5 characters)"
                onInput={inputHandlere}
                valid={formState.input.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>
                UPDATE PLACE
            </Button>
        </form>
    );
}

export default UpdatePlace;