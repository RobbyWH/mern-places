import React from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import './PlaceForm.css'
import { useForm } from '../../shared/hooks/formHook';
import { useHttpClient } from '../../shared/hooks/httpHook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHistory } from 'react-router-dom';
import {AuthContext} from '../../shared/context/authContext';

const UpdatePlace = () => {
  const auth = React.useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = React.useState<any>(); 
  const {placeId} = useParams<{placeId: string}>();
  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: '',
      isValid: true
    },
    description: {
      value: '',
      isValid: true
    }
  }, true);

  React.useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        )
        setLoadedPlace(responseData.place);
        setFormData({
          title: {
            value: responseData?.title,
            isValid: true
          },
          description: {
            value: responseData?.description,
            isValid: true
          }
        }, true);
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeSubmitHandler = React.useCallback(async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      history.push(`/${auth.userId}/places`);
    } catch (err) {}
  }, [formState.inputs, history, placeId, sendRequest, auth.userId])

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="title"
            validators={[
              VALIDATOR_REQUIRE()
            ]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedPlace?.title || ''}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[
              VALIDATOR_MINLENGTH(5)
            ]}
            errorText="Please enter a valid description."
            onInput={inputHandler}
            initialValue={loadedPlace?.description || ''}
            initialValid={true}
          />
          <Button
            type="submit"
            disabled={!formState.isValid}
          >
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;