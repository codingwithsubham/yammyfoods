import React, { Fragment } from 'react';

const CategorySlider = () => {
  return (
    <Fragment>
      <div className='catgry-slidr'>
        <div className='catgry-items'>
          <img alt='' src={require('../../static/bryni.jpg')} />
          <div className='label'>Biryani</div>
        </div>

        <div className='catgry-items'>
          <img alt='' src={require('../../static/dsi.jpg')} />
          <div className='label'>Homely</div>
        </div>

        <div className='catgry-items'>
          <img alt='' src={require('../../static/rls.jpg')} />
          <div className='label'>Rolls</div>
        </div>

        <div className='catgry-items'>
          <img alt='' src={require('../../static/noodls.jpg')} />
          <div className='label'>Noodles</div>
        </div>

        <div className='catgry-items'>
          <img alt='' src={require('../../static/mttn.jpg')} />
          <div className='label'>Non-veg</div>
        </div>

        <div className='catgry-items'>
          <img alt='' src={require('../../static/tndor.jpg')} />
          <div className='label'>Tandoor</div>
        </div>

        <div className='catgry-items'>
          <img alt='' src={require('../../static/snks.jpg')} />
          <div className='label'>Snacks</div>
        </div>

        <div className='catgry-items'>
          <img alt='' src={require('../../static/swts.jpg')} />
          <div className='label'>Sweets</div>
        </div>

        <div className='catgry-items'>
          <img alt='' src={require('../../static/icscrm.jpg')} />
          <div className='label'>Ice-Creams</div>
        </div>
      </div>
    </Fragment>
  );
};

export default CategorySlider;
