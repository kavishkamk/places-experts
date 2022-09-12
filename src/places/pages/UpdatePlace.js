import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./PlaceForm.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const UpdatePlace = () => {
    const placeId = useParams().pid;
    const [loadedplace, setLoadedPlaces] = useState();
    const {sendRequest, error, isLoading, clearError} = useHttpClient();
    const history = useHistory();
    const auth = useContext(AuthContext);

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

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(`places/${placeId}`);
                setLoadedPlaces(responseData.place);
                setFormData(
                    {
                        title: {
                            value: responseData.place.title,
                            isValid: true
                        },
                        description: {
                            value: responseData.place.description,
                            isValid: true
                        }
                    },
                    true
                );
            } catch (error) {

            }
        };
        fetchPlaces();
    }, [sendRequest, placeId, setFormData]);

    const plaseUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                `places/${placeId}`,
                "PATCH",
                JSON.stringify({
                    title : formState.input.title.value, 
                    description: formState.input.description.value
                }),
                {"Content-Type" : "application/json"}
            );
            history.push('/' + auth.userId + '/places');
        } catch (error) {}
    };

    if(isLoading && !error) {
        return (<
            div className="center">
                <LoadingSpinner />
            </div>
        );
    };
    
    if (!loadedplace) {
        return (
            <div className="center">
                <h2>Could Not Find Place !</h2>
            </div>
        );
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {
                !isLoading && loadedplace && 
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
            }
        </React.Fragment>
    );
}

export default UpdatePlace;