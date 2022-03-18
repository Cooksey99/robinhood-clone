import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import { Modal } from './context/Modal';
import { Portfolio } from './Portfolio/Portfolio';
import { Sidebar } from './components/Sidebar/Sidebar';
import LoginForm from './components/LoginFormModal/LoginForm';
import LoginFormPage from './components/LoginFormPage';
import { SplashPage } from './components/SplashPage/SplashPage';
import { StockPage } from './components/StockPage/StockPage';
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {/* <button onClick={() => setShowModal(true)}>Modal</button> */}
      {/* {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Hello I am a Modal</h1>
        </Modal>
      )} */}
      <Route path='/' exact>
        <SplashPage />
      </Route>
      {isLoaded && (
        <>
          <div id='app'>
            <Switch>
              <Route path="/login">
                <LoginFormPage />
              </Route>
              <Route path='/signup'>
                <SignupFormPage />
              </Route>
              <Route path='/portfolio'>
                <Portfolio />
                <Sidebar />
              </Route>
              <Route path='/stocks/:stockId'>
                <StockPage />
              </Route>

            </Switch>
          </div>
        </>
      )
      }
    </>
  );
}

export default App;
