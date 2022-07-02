import React from "react";

import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../shared/util/validators";

import "./Auth.css";

const Auth = () => {

    const [formState, inputHandlere] = useForm(
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

    const authUserData = event => {
        event.preventDefault();
        console.log("user authentication...");
    };

    return (
        <Card className="authentication">
            <h2 className="">Login Required</h2>
            <hr/>
            <form onSubmit={authUserData}>
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
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    label="Password"
                    errorMsg="Please use valid password (more then 8)"
                />
                <Button type="submit" disabled={!formState.isValid}>Login</Button>
            </form>
        </Card>
    );
};

export default Auth;