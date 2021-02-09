import React from 'react';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import './PlaceItem.css';

interface LocationProps {
  lat: number;
  lng: number;
};

export interface PlaceItemProps {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  address: string;
  creator: string;
  location: LocationProps
};


const PlaceItem = ({
  id,
  imageUrl,
  title,
  description,
  address,
  creator,
  location
}: PlaceItemProps) => {
  const [showMap, setShowMap] = React.useState(false);

  const openMapHandler = React.useCallback(() => {
    setShowMap(true);
  }, []);

  const closeMapHandler = React.useCallback(() => {
    setShowMap(false);
  }, []);

  return (
    <>
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
      <li className="place-item">
        <Card className="placee-item__content">
          <div className="place-item__image">
            <img src={imageUrl} alt={title} />
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
            <Button to={`/places/${id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
