import {useCallback, useReducer} from "react";

const formReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let isFormValid = true;
            for (const inputId in state.input) {
                if (!state.input[inputId]) {
                    continue;
                }
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
        case "SET_DATA":
            return {
                input: action.inputs,
                isValid: action.formIsValid
            }
        default:
            return state;
    }
};

export const useForm = (initialInput, initialValid) => {

    const [formState, dispatch] = useReducer(formReducer, {
        input: initialInput,
        isValid: initialValid
    });

    const inputHandlere = useCallback((id, value, isValid) => {
        dispatch({type: "INPUT_CHANGE", id: id, value: value, isValid: isValid });
    }, []);

    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({type: "SET_DATA", inputs: inputData, formIsValid: formValidity});
    }, []);

    return [formState, inputHandlere, setFormData];
};

