import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
// import { Modal } from './context/Modal';
import { Sidebar } from './components/Sidebar/Sidebar';
import LoginForm from './components/LoginFormModal/LoginForm';
import LoginFormPage from './components/LoginFormPage';
import { SplashPage } from './components/SplashPage/SplashPage';
import { StockPage } from './components/StockPage/StockPage';
import { Portfolio } from './components/Portfolio/Portfolio';
import { WatchlistPage } from './components/WatchlistPage/WatchlistPage';
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
              <Route path="/login" exact>
                <LoginFormPage />
              </Route>
              <Route path='/signup' exact>
                <SignupFormPage />
              </Route>
              <Route path='/portfolio' exact>
                <Portfolio />
                <Sidebar />
              </Route>
              <Route path='/asset/:symbol' exact>
                <StockPage />
              </Route>
              <Route path='/list/:id' exact>
                <WatchlistPage />
                <Sidebar />
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
