import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { 
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/formHook';
import { AuthContext } from '../../shared/context/authContext';
import { useHistory } from "react-router-dom";
import './Auth';

const Auth = () => {
  const history = useHistory();
  const auth = React.useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    }
  }, false);
  const [isLoginMode, setIsLoginMode] = React.useState(true);

  const switchModeHandler = React.useCallback(() => {
    if (!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name: undefined
      }, formState.inputs.email.isValid && formState.inputs.password.isValid)
    } else {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false
        },
      }, false)
    }
    setIsLoginMode(prevMode => !prevMode);
  }, [formState, isLoginMode, setFormData])

  const authSubmitHandler = React.useCallback((event) => {
    event.preventDefault();
    console.log(formState);
    auth.login();
    history.push('/')
  }, [formState, auth, history])

  return (
    <Card style={{margin: 20}}>
      <h2>Login required</h2>
      <hr />
      <form style={{marginBottom: 20}} className="place-form" onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            label="Your Name"
            type="text"
            id="name"
            element="input"
            validators={[
              VALIDATOR_REQUIRE()
            ]}
            errorText="Please enter a name"
            onInput={inputHandler}
          />
        )}
        <Input
          label="Email"
          type="email"
          element="input"
          id="email"
          validators={[
            VALIDATOR_EMAIL()
          ]}
          errorText="Please enter a valid email address"
          onInput={inputHandler}
        />
        <Input
          label="Password"
          type="password"
          element="input"
          id="password"
          validators={[
            VALIDATOR_MINLENGTH(5)
          ]}
          errorText="Please enter a password"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {!isLoginMode ? 'LOGIN' : 'SIGNUP'}
      </Button>
    </Card>
  );
};

export default Auth;