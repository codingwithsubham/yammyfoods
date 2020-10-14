import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import ProductDetails from '../singleProducts/SingleProducts';
import FoodHubs from '../hubsAndRests/FoodHubs';
import NotFound from '../layout/NotFound';
import Alert from '../layout/Alert';
import Cart from '../cartAndChekout/Cart';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/food-hubs' component={FoodHubs} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/product/:id' component={ProductDetails} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
