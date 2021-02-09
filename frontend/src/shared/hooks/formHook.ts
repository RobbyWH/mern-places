import React from 'react';

interface ActionProps {
  type: string;
  inputId: string;
  isValid: boolean;
  value: string;
};

const initialState = (initialInputs: unknown, initialFormValidity: boolean) => ({
  inputs: initialInputs,
  isValid: initialFormValidity,
})

const formReducer = (state: any, action: ActionProps) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = action.isValid;
        } else {
          formIsValid = state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { 
            value: action.value,
            isValid: action.isValid
          }, 
        },
        isValid: formIsValid
      };
    default:
      return state;
  };
};

export const useForm = (initialInputs: unknown, initialFormValidity: boolean) => {
  const [formState, dispatch] = React.useReducer(formReducer, initialState(initialInputs, initialFormValidity));
  const inputHandler = React.useCallback((id: string = '', value: string = '', isValid: boolean = false) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value,
      isValid,
      inputId: id
    })
  }, [dispatch]);

  return [formState, inputHandler];
}