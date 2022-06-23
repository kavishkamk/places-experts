import {useCallback, useReducer} from "react";

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

export const useForm = (initialInput, initialValid) => {

    const [formState, dispatch] = useReducer(formReducer, {
        input: initialInput,
        isValid: initialValid
    });

    const inputHandlere = useCallback((id, value, isValid) => {
        dispatch({type: "INPUT_CHANGE", id: id, value: value, isValid: isValid });
    }, []);

    return [formState, inputHandlere]
};

