// this return <input/> if props.type == "input", else return <textarea/>

import React, {useReducer, useEffect} from "react";

import { validate } from "../../util/validators";

import "./Input.css";

const Input = props => {

    const inputReducer = (state, action) => {
        switch(action.type) {
            case "CHANGE":
                return {
                    ...state,
                    value: action.val,
                    isValid: validate(action.val, action.validators)
                };
            case "TOUCH":
                return {
                    ...state,
                    isTouched: true
                }
            default:
                return state;
        }
    };

    // this reduser keep states of the input field
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.value || "", 
        isValid: props.valid || false, 
        isTouched: false
    });

    // this is onChange event
    const changeHandler = event => {
        dispatch({type: "CHANGE", val: event.target.value, validators: props.validators});
    };

    // this is OnBlur event
    const touchHandler = () => {
        dispatch({type: "TOUCH"});
    };

    const {value, isValid} = inputState;
    const {id, onInput} = props;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [value, isValid, id, onInput]);

    const element = props.element === "input" ?
        (<input 
            id={props.id} 
            type={props.type} 
            placeholder={props.placeholder} 
            onChange={changeHandler} 
            onBlur={touchHandler}
            value={inputState.value} />)
        :
        (<textarea 
            id={props.id} 
            rows={props.rows || 3} 
            onChange={changeHandler} 
            onBlur={touchHandler}
            value={inputState.value} />);

    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && (<p>{props.errorMsg}</p>)}
        </div>
    );
};

export default Input;