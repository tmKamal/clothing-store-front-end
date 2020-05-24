import React from 'react';

import Modal from './model';
import Button from '../../form-elements/button';

const SuccessModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Operation Succeeded"
      show={!!props.msg}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.msg}</p>
    </Modal>
  );
};

export default SuccessModal;
