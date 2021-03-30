import React from 'react';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import { AuthContext } from '../../shared/context/authContext';
import './PlaceItem.css';
import { useHttpClient } from '../../shared/hooks/httpHook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

interface LocationProps {
  lat: number;
  lng: number;
};

export interface PlaceItemProps {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creator: string;
  location: LocationProps,
  onDelete: (deletedPlaceId: string) => void
};


const PlaceItem = ({
  id,
  image,
  title,
  description,
  address,
  creator,
  location,
  onDelete
}: PlaceItemProps) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = React.useContext(AuthContext);
  const [showMap, setShowMap] = React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  const openMapHandler = React.useCallback(() => {
    setShowMap(true);
  }, []);

  const closeMapHandler = React.useCallback(() => {
    setShowMap(false);
  }, []);

  const showDeleteWarningHandler = React.useCallback(() => {
    setShowConfirmModal(true);
  }, []);

  const cancelDeleteWarningHandler = React.useCallback(() => {
    setShowConfirmModal(false);
  }, []);

  const confirmDeleteHandler = React.useCallback(async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${id}`,
        'DELETE'
      );
      onDelete && onDelete(id);
    } catch (err) {}
  }, [sendRequest, id, onDelete]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={location} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteWarningHandler}
        header={"Are you sure?"}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteWarningHandler}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
          </>
        }
      >
        <p style={{padding: 10}}>
          Do you want to proceeed and delete this place?
          Please note that it can't be undonee thereafter.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="placee-item__content">
          {
            isLoading && (
              <div className="center">
                <LoadingSpinner asOverlay />
              </div>
            )
          }
          <div className="place-item__image">
            <img src={`http://localhost:5000/${image}`} alt={title} />
          </div>
          <div className="place-iteem__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button
              inverse
              onClick={openMapHandler}>
                VIEW ON MAP
            </Button>
            {
              auth.userId === creator && (
                <>
                  <Button to={`/places/${id}`}>EDIT</Button>
                  <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
                </>
              )
            }
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
