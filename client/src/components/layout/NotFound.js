import React, { Fragment } from 'react';

const NotFound = props => {
  return (
    <Fragment>
      <h1 className='x-large text-primary'>
        <i className='fa fa-exclamation-triangle' /> No {props.msg} Found
      </h1>
      <p className='large'>Sorry, there are no {props.msg} for you</p>
    </Fragment>
  );
};

export default NotFound;
