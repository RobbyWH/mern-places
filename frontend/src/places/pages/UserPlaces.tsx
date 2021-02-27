import React from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/httpHook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = React.useState<Array<any>>([]); 
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const {userId} = useParams<{userId: string}>();

  React.useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        )
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeleteHandler = React.useCallback((deletedPlaceId: string) => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
  }, []);

  return (
    <>
     <ErrorModal error={error} onClear={clearError} />
      {
        isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )
      }
      {!isLoading && loadedPlaces && (
        <PlaceList
          items={loadedPlaces}
          onDeletePlace={placeDeleteHandler}
        />
      )}
    </>
  );
};

export default UserPlaces;
