import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./components/routing/Routes";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";
import "./index.css";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import BottomBar from "./components/layout/BottomBar";
import ServiceUnavailable from "./components/layout/ServiceUnavailable";
import PullToRefresh from "react-simple-pull-to-refresh";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const [width] = useWindowSize();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {width <= 768 ? (
            <Fragment>
              <ServiceUnavailable />
              <Navbar />
              <Sidebar />
              <Switch>
                <PullToRefresh onRefresh={handleRefresh}>
                  <Route component={Routes} />
                </PullToRefresh>
              </Switch>
              <BottomBar />
            </Fragment>
          ) : (
            <div className="scrn-wrapper">
              <div className="smartphone">
                <div className="content">
                  <iframe
                    src={`${window.location.href}`}
                    style={{ width: "100%", border: "none", height: "100%" }}
                  />
                </div>
              </div>
            </div>
          )}
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
