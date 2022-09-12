import React, { useState, useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import "./Auth.css";

const Auth = () => {

    const auth = useContext(AuthContext);

    const [isLogging, setLogging] = useState(true);
    const { sendRequest, error, isLoading, clearError } = useHttpClient();

    const [formState, inputHandlere, setFormData] = useForm(
        {
            usermail: {
                value: "",
                isValid: false
            },
            userpwd: {
                value: "",
                isValid:false
            }
        },
        false
    );

    const switchModeHandler = () => {
        if(!isLogging) {
            setFormData({
                    ...formState.input,
                    name: undefined,
                    image: undefined
                } ,
                formState.input.usermail.isValid && formState.input.userpwd.isValid
            );
        } else {
            setFormData({
                    ...formState.input,
                    name: {
                        value: "",
                        isValid: false
                    },
                    image: {
                        value: null,
                        isValid: false
                    }
                },
                false
            );
        }
        setLogging(isLogging => !isLogging);
    };

    const authUserData = async event => {
        event.preventDefault();
        console.log(formState.input);

        if (isLogging) {
            try {
                const responseData = await sendRequest(
                    "users/login",
                    "POST",
                    JSON.stringify({
                        password: formState.input.userpwd.value,
                        email: formState.input.usermail.value,
                    }),
                    {
                        "Content-Type": "application/json"
                    }
                );

                auth.login(responseData.user.id);
            } catch (err) {
            }
        } else {
            try {
                const formData = new FormData();
                formData.append("username", formState.input.name.value);
                formData.append("password", formState.input.userpwd.value);
                formData.append("email", formState.input.usermail.value);
                formData.append("image", formState.input.image.value);
                const responseData = await sendRequest("users/signup",
                    "POST",
                    formData
                );
                auth.login(responseData.user.id);
            } catch (err) {
            }
        }
    };

    return (
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay/>}
            <h2 className="">Login Required</h2>
            <hr/>
            <form onSubmit={authUserData}>
                {!isLogging && (
                    <Input 
                        element="input"
                        id="name"
                        type="text"
                        label="Your Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorMsg="Please Enter a name"
                        onInput={inputHandlere}
                    />
                )}
                {
                    !isLogging && (<ImageUpload center id="image" onInput={inputHandlere} errorText="Please select a image"/>)
                }
                <Input 
                    id="usermail"
                    element="input"
                    type="email"
                    placeholder="sample@gmail.com"
                    onInput={inputHandlere}
                    validators={[VALIDATOR_EMAIL()]}
                    label="Username"
                    errorMsg="Please Enter valid Email"
                />
                <Input 
                    id="userpwd"
                    element="input"
                    type="password"
                    placeholder="******"
                    onInput={inputHandlere}
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    label="Password"
                    errorMsg="Please use valid password (more then 8)"
                />
                <Button type="submit" disabled={!formState.isValid}>{isLogging ? "Login" : "Signup"}</Button>
            </form>
            <Button inverse onClick={switchModeHandler}>Switch to {isLogging ? "Signup" : "Login"}</Button>
        </Card>
        </React.Fragment>
    );
};

export default Auth;