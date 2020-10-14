import React, { Fragment } from 'react';
import spinner from './looder.gif';
import { useSpring, animated } from 'react-spring';

export default () => {
  const animation = useSpring({
    opacity: 1,
    transition: '0.1s',
    from: { opacity: 0 }
  });
  return (
    <animated.div style={animation}>
      <Fragment>
        <img src={spinner} className='spinner' alt='Loading...' />
      </Fragment>
    </animated.div>
  );
};
