import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { 
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/formHook';
import { AuthContext } from '../../shared/context/authContext';
import './Auth';

const Auth = () => {
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
  const [isLoginMode, setIsLoginMode] = React.useState<boolean>(true);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

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

  const authSubmitHandler = React.useCallback(async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (isLoginMode) {
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login();
      } catch (err) {
        setIsLoading(false);
        setError(err.message || 'Something went wrong');
      }
    } else {
      try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login();
      } catch (err) {
        setIsLoading(false);
        setError(err.message || 'Something went wrong');
      } 
    }
  }, [formState, auth, isLoginMode])

  const errorHandler = React.useCallback(() => {
    setError('')
  }, [])

  return (
    <>
      <ErrorModal
        onClear={errorHandler}
        error={error}
      />
      <Card style={{margin: 20}}>
        {isLoading && <LoadingSpinner asOverlay />}
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
    </>
  );
};

export default Auth;