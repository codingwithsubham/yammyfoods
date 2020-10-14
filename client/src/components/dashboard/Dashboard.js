import React, { Fragment } from 'react';
import LatestProductSlider from './LatestProductSlider';
import CategorySlider from './CategorySlider';
import LatestProducts from '../all_products/LatestProducts';

const Dashboard = () => {
  return (
    <Fragment>
      <LatestProductSlider />
      <div className='header'>
        Find By Category <span>View All</span>
      </div>
      <CategorySlider />
      <div className='header'>
        New Arrivals <span>View All</span>
      </div>
      <LatestProducts />
    </Fragment>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
