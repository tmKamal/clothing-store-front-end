import React, { useState } from "react";
import Modal from "react-modal";
import AddReview from "../../add-review/add-review";
import PropTypes from "prop-types";

const OrderItem = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Modal isOpen={modalIsOpen}>
        <div
          className='react-modal-close-button'
          onClick={() => setIsOpen(false)}
        >
          &#9932;
        </div>
        <AddReview product={id} />
      </Modal>
    </div>
  );
};

OrderItem.propTypes = {};

export default OrderItem;
