import React from 'react';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [loadedUsers, setLoadedUsers] = React.useState<Array<any>>([]);

  React.useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/users')
        const responseData = await response.json();
  
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoadedUsers(responseData.users);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    }
    sendRequest();
  }, []);

  const errorHandler = React.useCallback(() => {
    setError('');
  }, [])

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {
        isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )
      }
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};

export default Users;
