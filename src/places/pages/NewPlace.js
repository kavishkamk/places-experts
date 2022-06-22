import React, {useCallback, useReducer} from "react";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";

import "./NewPlaces.css";

const formReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let isFormValid = true;
            for (const inputId in state.input) {
                if (inputId === action.id) {
                    isFormValid = isFormValid && action.isValid;
                } else {
                    isFormValid = isFormValid && state.input[inputId].isValid;
                }
            }
            return {
                ...state,
                input: {
                    ...state.input,
                    [action.id]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValid: isFormValid
            };
        default:
            return state;
    }
};

const NewPlace = () => {

    const [formState, dispatch] = useReducer(formReducer, {
        input: {
            title: {
                value: "",
                isValid: false
            },
            description: {
                value: "",
                isValid: false
            }
        },
        isValid: false
    });

    const inputHandlere = useCallback((id, value, isValid) => {
        dispatch({type: "INPUT_CHANGE", id: id, value: value, isValid: isValid });
    }, []);

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
                errorMsg="Please Enter a valid Description."
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