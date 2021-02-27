import React from 'react';
import UserItem from './UserItem';
import './UsersList.css';

interface UserDataProps {
  id: string;
  image: string;
  name: string;
  places: Array<any>;
};

interface UsersListProps {
  items: Array<UserDataProps>;
};

const UsersList = ({items}: UsersListProps) => {
  if (items.length === 0) {
    return <div className="center">
      <h2>No users found</h2>
    </div>
  } 

  return (
    <ul className="users-list">
      {items.map(user => {
        return <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      })}
    </ul>
  )
};

export default UsersList;
