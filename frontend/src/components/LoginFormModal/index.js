import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const history = useHistory();
  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button /*onClick={() => setShowModal(true)}*/
      onClick={() => history.push('/login')}>Log In</button>
      {/* {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )} */}
    </>
  );
}

export default LoginFormModal;
