import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import "./PlaceForm.css";

const NewPlace = () => {

    const {sendRequest, error, isLoading, clearError} = useHttpClient();
    const auth = useContext(AuthContext);
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
            },
            image : {
                value: "",
                isValid: false
            }
        },
        false
    );

    const history = useHistory();

    // form submision function -> this will send data to the backend
    const formSubmitHandler = async event => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append("title", formState.input.title.value);
            formData.append("description", formState.input.description.value);
            formData.append("address", formState.input.address.value);
            formData.append("image", formState.input.image.value);
            await sendRequest(
                "places",
                "POST",
                formData,
                {
                    authorization: "Bearer " + auth.token
                }
            );
           history.push("/");
        } catch (error) {
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className="place-form" onSubmit={formSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input 
                    id="title"
                    element="input" 
                    type="text" 
                    label="Title" 
                    validators={[VALIDATOR_REQUIRE()]} 
                    errorMsg="Please Enter a valid Title."
                    onInput={inputHandlere} 
                />
                <ImageUpload 
                    center 
                    id="image" 
                    onInput={inputHandlere}
                    errorText="Please select a image"
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
        </React.Fragment>
    );
};

export default NewPlace;