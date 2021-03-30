import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { 
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/formHook';
import { useHttpClient } from '../../shared/hooks/httpHook';
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
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  const switchModeHandler = React.useCallback(() => {
    if (!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name: undefined,
        image: undefined
      }, formState.inputs.email.isValid && formState.inputs.password.isValid)
    } else {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false
        },
        image: {
          value: null,
          isValid: false
        }
      }, false)
    }
    setIsLoginMode(prevMode => !prevMode);
  }, [formState, isLoginMode, setFormData])

  const authSubmitHandler = React.useCallback(async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        auth.login(responseData.user.id);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          formData
        );

        auth.login(responseData.user.id);
      } catch (err) {}
    }
  }, [formState, auth, isLoginMode, sendRequest])

  return (
    <>
      <ErrorModal
        onClear={clearError}
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
          {!isLoginMode && (
            <ImageUpload
              center
              id="image"
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
              VALIDATOR_MINLENGTH(6)
            ]}
            errorText="Please enter a valid password"
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