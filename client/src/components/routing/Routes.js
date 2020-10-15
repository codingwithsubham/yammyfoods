import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import ProductDetails from '../singleProducts/SingleProducts';
import FoodHubs from '../hubsAndRests/FoodHubs';
import FoodHub from '../hubsAndRests/SingleFoodHub';
import Restro from '../hubsAndRests/SingleRestros';
import NotFound from '../layout/NotFound';
import Alert from '../layout/Alert';
import Cart from '../cartAndChekout/Cart';
import ScrollToTop from '../../ScrollToTop';

const Routes = () => {
  return (
    <section className='container'>
      <div className='main-content'>
        <Alert />
        <ScrollToTop />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/food-hubs' component={FoodHubs} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/product/:id' component={ProductDetails} />
          <Route exact path='/food-hub/:id' component={FoodHub} />
          <Route exact path='/restro/:id' component={Restro} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </section>
  );
};

export default Routes;
