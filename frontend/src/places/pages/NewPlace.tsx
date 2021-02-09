import React from 'react';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import './NewPlace.css'

interface ActionProps {
  type: string;
  inputId: string;
  isValid: boolean;
  value: string;
};

interface InputProps {
  value: string;
  isValid: boolean;
};

interface InputsProps {
  [key: string]: InputProps;
};

interface StateProps {
  inputs?: InputsProps;
  isValid?: boolean;
};

const initialState = {
  inputs: {
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    }
  },
  isValid: false,
}

const formReducer = (state: StateProps = initialState, action: ActionProps) => {
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

const NewPlace = () => {
  const [formState, dispatch] = React.useReducer(formReducer, initialState);
  
  const inputHandler = React.useCallback((id: string = '', value: string = '', isValid: boolean) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value,
      isValid,
      inputId: id
    })
  }, [dispatch]);

  const placeSubmitHandler = React.useCallback((event) => {
    event.preventDefault();
    console.log(formState.inputs);
  }, [formState.inputs])

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[
          VALIDATOR_REQUIRE()
        ]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
       <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[
          VALIDATOR_MINLENGTH(5)
        ]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[
          VALIDATOR_REQUIRE()
        ]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
    </form>
  );
};

export default NewPlace;
