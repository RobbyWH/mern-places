import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import PlaceItem, {PlaceItemProps} from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';

import './PlaceList.css';

interface PlaceListProps {
  items: Array<PlaceItemProps>;
  onDeletePlace: (deletedPlaceId: string) => void;
}

const PlaceList = ({items, onDeletePlace}: PlaceListProps) => {
  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    )
  }

  return (
    <ul className="place-list">
      {
        items.map(place => (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.image}
            title={place.title}
            description={place.description}
            address={place.address}
            creator={place.creator}
            location={place.location}
            onDelete={onDeletePlace}
          />
        ))
      }
    </ul>
  )
};

export default PlaceList;
