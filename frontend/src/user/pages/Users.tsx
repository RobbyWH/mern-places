import React from 'react';
import UsersList from '../components/UsersList';

const USERS = [
  {
    id: 'u1',
    name: 'robby widyahartono',
    image: 'https://upload.wikimedia.org/wikipedia/en/e/e5/Ryu_TvC.png',
    places: 3
  }
];

const Users = () => {
  return <UsersList items={USERS} />
};

export default Users;
