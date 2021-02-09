import React from 'react';

import { validate, Validators } from '../../util/validators';
import './Input.css';

interface InputProps {
  label: string;
  id?: string;
  element?: string;
  type: string;
  placeholder?: string;
  rows?: number;
  errorText?: string;
  validators?: Validators;
};


interface ActionProps {
  type: string;
  val?: string;
  validators?: Validators;
};

interface StateProps {
  value?: string,
  isValid?: boolean,
  isTouched?: boolean
};

const initialState = {
  value: '',
  isValid: false,
  isTouched: false
}

const inputReducer = (state: StateProps = initialState, action: ActionProps) => {
  switch (action.type) {
    case 'CHANGE': 
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val || '', action.validators || [])
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      }
    }
    default:
      return state;
  };
};

const Input = ({
  label,
  id,
  type,
  placeholder,
  rows = 3,
  element,
  errorText,
  validators
}: InputProps) => {
  const [inputState, dispatch] = React.useReducer(inputReducer, initialState);
  const changeHandler = React.useCallback(event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators,
    })
  }, [validators]);

  const touchHandler = React.useCallback(() => {
    dispatch({
      type: 'TOUCH'
    })
  }, []);

  const elementHtml = React.useMemo(() => {
    return element === 'input'
      ? <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={inputState.value}
          onChange={changeHandler}
          onBlur={touchHandler}
        />
      : <textarea
          id={id}
          rows={rows}
          value={inputState.value}
          onChange={changeHandler}
          onBlur={touchHandler}
        />
  }, [
    element,
    id,
    type,
    placeholder,
    rows,
    changeHandler,
    inputState.value,
    touchHandler
  ]);
  
  return (
    <div className={`form-control ${
      !inputState.isValid
      && inputState.isTouched
      && 'form-control--invalid'
    }`}>
      <label htmlFor={id}>{label}</label>
      {elementHtml}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  )
};

export default Input;