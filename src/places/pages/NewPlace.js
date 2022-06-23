import React from "react";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";

import "./PlaceForm.css";

const NewPlace = () => {

    // const [formState, dispatch] = useReducer(formReducer, {
    //     input: {
    //         title: {
    //             value: "",
    //             isValid: false
    //         },
    //         description: {
    //             value: "",
    //             isValid: false
    //         },
    //         address: {
    //             value: "",
    //             isValid: false
    //         }
    //     },
    //     isValid: false
    // });

    // const inputHandlere = useCallback((id, value, isValid) => {
    //     dispatch({type: "INPUT_CHANGE", id: id, value: value, isValid: isValid });
    // }, []);

    const [formState, inputHandlere] = useForm(
        {
            title: {
                value: "",
                isValid: false
            },
            description: {
                value: "",
                isValid: false
            },
            address: {
                value: "",
                isValid: false
            }
        },
        false
    );

    // form submision function -> this will send data to the backend
    const formSubmitHandler = event => {
        event.preventDefault();
        console.log(formState);
    }

    return (
        <form className="place-form" onSubmit={formSubmitHandler}>
            <Input 
                id="title"
                element="input" 
                type="text" 
                label="Title" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorMsg="Please Enter a valid Title."
                onInput={inputHandlere} 
            />
            <Input 
                id="description"
                element="textarea" 
                type="text" 
                label="Description" 
                validators={[VALIDATOR_MINLENGTH(5)]} 
                errorMsg="Please Enter a valid Description. (Min. 5 characters)"
                onInput={inputHandlere} 
            />
            <Input 
                id="address"
                element="input" 
                type="text" 
                label="Address" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorMsg="Please Enter a valid Address."
                onInput={inputHandlere} 
            />
            <Button type="submit" disabled={!formState.isValid}>Add Place</Button>
        </form>
    );
};

export default NewPlace;