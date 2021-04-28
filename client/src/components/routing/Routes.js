import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import ProductDetails from '../singleProducts/SingleProducts';
import FoodHubs from '../hubsAndRests/FoodHubs';
import FoodHub from '../hubsAndRests/SingleFoodHub';
import Restro from '../hubsAndRests/SingleRestros';
import NotFound from '../layout/NotFound';
import Alert from '../layout/Alert';
import Login from '../auth/Login';
import Cart from '../cartAndChekout/Cart';
import ScrollToTop from '../../ScrollToTop';
import PrivateRoute from './PrivateRoute';
import Checkout from '../cartAndChekout/Checkout';
import Checkout_Success from '../cartAndChekout/Checkout_Success';
import Orders from '../customer/Orders';
import ViewOrder from '../customer/ViewOrder';
import Wallet from '../customer/Wallet';
import SearchFoods from '../dashboard/SearchFoods';
import CategoryResults from '../dashboard/CategoryResults';

const Routes = () => {
  return (
    <section className='container'>
      <div className='main-content'>
        <Alert />
        <ScrollToTop />
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={Login} />
          <PrivateRoute exact path='/home' component={Dashboard} />
          <PrivateRoute exact path='/food-hubs' component={FoodHubs} />
          <PrivateRoute exact path='/cart' component={Cart} />
          <PrivateRoute exact path='/product/:id' component={ProductDetails} />
          <PrivateRoute exact path='/food-hub/:id' component={FoodHub} />
          <PrivateRoute exact path='/restro/:id' component={Restro} />
          <PrivateRoute exact path='/checkout' component={Checkout} />
          <PrivateRoute exact path='/orders' component={Orders} />
          <PrivateRoute exact path='/search' component={SearchFoods} />
          <PrivateRoute exact path='/wallet' component={Wallet} />
          <PrivateRoute exact path='/view-Order/:id' component={ViewOrder} />
          <PrivateRoute
            exact
            path='/category/:name'
            component={CategoryResults}
          />
          <PrivateRoute
            exact
            path='/checkout/success'
            component={Checkout_Success}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </section>
  );
};

export default Routes;
