import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getRestrosByFoodhub } from '../../actions/category';
import { connect } from 'react-redux';
import DummyHub from './DummyHub';
import { Link } from 'react-router-dom';
import { scroller } from 'react-scroll';

const SingleFoodHub = ({
  getRestrosByFoodhub,
  category: { restros, loading },
  match
}) => {
  useEffect(() => {
    getRestrosByFoodhub(match.params.id);
  }, [getRestrosByFoodhub, match.params.id]);

  let data = restros && restros;
  const unique = [...new Set(data && data.map(item => item.description))];

  const scrollToId = name => {
    scroller.scrollTo(name, {
      activeClass: 'active',
      duration: 500,
      delay: 100,
      smooth: true,
      spy: true,
      offset: -120
    });
    showHide('hover-content');
  };

  const showHide = id => {
    let elmnt = document.getElementById(id);
    let ovrly = document.getElementById('overlay');
    if (elmnt) {
      if (elmnt.style.display == 'block') {
        elmnt.style.display = 'none';
        ovrly.style.display = 'none';
      } else {
        elmnt.style.display = 'block';
        ovrly.style.display = 'block';
      }
    }
  };

  return loading || !restros ? (
    <Fragment>
      <DummyHub />
      <DummyHub />
      <DummyHub />
      <DummyHub />
    </Fragment>
  ) : (
    unique && restros && (
      <Fragment>
        <div className='all-hubs'>
          {unique.map((tag, idx) => (
            <Fragment key={idx}>
              <div id={tag} className='header'>
                {tag}
              </div>
              {restros
                .filter(x => x.description == tag)
                .map(item => (
                  <Link key={item.id} to={`/restro/${item.id}`}>
                    <img
                      className='content'
                      alt=''
                      src={item.image && item.image.src}
                    />
                  </Link>
                ))}
            </Fragment>
          ))}
        </div>
        <div className='sort-rests'>
          <div className='hover-menu'>
            <button
              className='hoverbtn'
              onClick={() => showHide('hover-content')}
            >
              Sort By Type
            </button>
            <div
              id='overlay'
              onClick={() => showHide('hover-content')}
              className='overlay'
            ></div>
            <div id='hover-content' className='hover-menu-content'>
              {unique.map((tag, idx) => (
                <p key={`${tag}${idx}`} onClick={() => scrollToId(tag)}>
                  {tag}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Fragment>
    )
  );
};

SingleFoodHub.propTypes = {
  getRestrosByFoodhub: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(mapStateToProps, {
  getRestrosByFoodhub
})(SingleFoodHub);
