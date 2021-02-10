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

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg',
    address: '20 W 34th St, New York, NY 10001, United States',
    location: {
      lat: 40.74922,
      lng: -73.98545
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State Building 2',
    description: 'One of the most famous sky scrapers in the world',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg',
    address: '20 W 34th St, New York, NY 10001, United States',
    location: {
      lat: 40.74922,
      lng: -73.98545
    },
    creator: 'u2'
  }
]

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
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

  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

  React.useEffect(() => {
    if (identifiedPlace) {
      setFormData({
        title: {
          value: identifiedPlace?.title,
          isValid: true
        },
        description: {
          value: identifiedPlace?.description,
          isValid: true
        }
      }, true);
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace])

  const placeSubmitHandler = React.useCallback((event) => {
    event.preventDefault();
    console.log(formState.inputs);
  }, [formState.inputs])

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
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
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
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
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button
        type="submit"
        disabled={!formState.isValid}
      >
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;