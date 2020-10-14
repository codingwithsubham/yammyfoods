import React, {
  Fragment,
  //  useEffect
  useLayoutEffect,
  useState
} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './components/routing/Routes';
import { Provider } from 'react-redux';
import store from './store';
//import { loadUser } from './actions/auth';
//import Login from './components/auth/Login';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import './index.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Navbar from './components/layout/Navbar';
import BottomBar from './components/layout/BottomBar';
import Sidebar from 'react-sidebar';

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
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);
  const [width] = useWindowSize();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const onSetSidebarOpen = e => {
    setSidebarOpen(e);
  };

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {width <= 768 ? (
            <Switch>
              <Sidebar
                sidebar={<b>Sidebar content</b>}
                open={sidebarOpen}
                onSetOpen={onSetSidebarOpen}
                styles={{
                  sidebar: { background: 'white', zIndex: 99999, width: '70%' }
                }}
              >
                <Navbar />
                <i
                  className='material-icons menu-button'
                  onClick={() => onSetSidebarOpen(true)}
                >
                  menu
                </i>
                <div className='main-content'>
                  {/* <Route exact path='/' component={Dashboard} /> */}
                  <Route component={Routes} />
                </div>
                <BottomBar />
              </Sidebar>
            </Switch>
          ) : (
            <div>Device Unsupported</div>
          )}
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
