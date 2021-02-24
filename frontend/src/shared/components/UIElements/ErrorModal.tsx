import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

interface Props {
  onClear: () => void;
  error: boolean;
};

const ErrorModal = ({onClear, error}: Props) => {
  return (
    <Modal
      onCancel={onClear}
      header="An Error Occurred!"
      show={!!error}
      footer={<Button onClick={onClear}>Okay</Button>}
    >
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;
