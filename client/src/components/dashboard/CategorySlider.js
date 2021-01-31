import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const CategorySlider = () => {
  return (
    <Fragment>
      <div className='catgry-slidr'>
        <Link to='/food-hubs' className='catgry-items'>
          <img alt='' src={require('../../static/bryni.jpg')} />
          <div className='label'>Biryani</div>
        </Link>

        <Link to='/food-hubs' className='catgry-items'>
          <img alt='' src={require('../../static/dsi.jpg')} />
          <div className='label'>Homely</div>
        </Link>

        <Link to='/food-hubs' className='catgry-items'>
          <img alt='' src={require('../../static/rls.jpg')} />
          <div className='label'>Rolls</div>
        </Link>

        <Link to='/food-hubs' className='catgry-items'>
          <img alt='' src={require('../../static/noodls.jpg')} />
          <div className='label'>Noodles</div>
        </Link>

        <Link to='/food-hubs' className='catgry-items'>
          <img alt='' src={require('../../static/mttn.jpg')} />
          <div className='label'>Non-veg</div>
        </Link>

        <Link to='/food-hubs' className='catgry-items'>
          <img alt='' src={require('../../static/tndor.jpg')} />
          <div className='label'>Tandoor</div>
        </Link>

        <Link to='/food-hubs' className='catgry-items'>
          <img alt='' src={require('../../static/snks.jpg')} />
          <div className='label'>Snacks</div>
        </Link>

        <Link to='/food-hubs' className='catgry-items'>
          <img alt='' src={require('../../static/swts.jpg')} />
          <div className='label'>Sweets</div>
        </Link>

        <Link to='/food-hubs' className='catgry-items'>
          <img alt='' src={require('../../static/icscrm.jpg')} />
          <div className='label'>Ice-Creams</div>
        </Link>
      </div>
    </Fragment>
  );
};

export default CategorySlider;
