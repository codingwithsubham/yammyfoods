import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './components/routing/Routes';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import './index.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import BottomBar from './components/layout/BottomBar';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const [width] = useWindowSize();

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {width <= 768 ? (
            <Fragment>
              <Navbar />
              <Sidebar />
              <Switch>
                <Route component={Routes} />
              </Switch>
              <BottomBar />
            </Fragment>
          ) : (
            <div>Device Unsupported</div>
          )}
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
