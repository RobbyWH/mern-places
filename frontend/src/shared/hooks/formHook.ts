import React from 'react';

const initialState = (initialInputs: unknown, initialFormValidity: boolean) => ({
  inputs: initialInputs,
  isValid: initialFormValidity,
})

const formReducer = (state: any, action: any) => {
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
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
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

  const setFormData = React.useCallback((inputData: unknown, formValidity: boolean) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity
    })
  }, [])

  return [formState, inputHandler, setFormData];
}