import React from 'react';
import LatestProductSlider from './LatestProductSlider';
import CategorySlider from './CategorySlider';
import LatestProducts from '../all_products/LatestProducts';
import HubsSlider from '../dashboard/HubsSlider';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <LatestProductSlider />
      <div className='header'>
        Find By Category <span>View All</span>
      </div>
      <CategorySlider />
      <div className='header'>
        New Arrivals <span>View All</span>
      </div>
      <LatestProducts />
      <div className='header'>
        Hubs Near You <span>View All</span>
        <HubsSlider />
      </div>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
