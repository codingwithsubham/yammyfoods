import React, { Fragment, useEffect } from 'react';
import PropTypes, { element } from 'prop-types';
import { getFoodHubs } from '../../actions/category';
import { connect } from 'react-redux';
import DummyHub from './DummyHub';
import { Link } from 'react-router-dom';
import { scroller } from 'react-scroll';

const SingleFoodHub = ({
  getFoodHubs,
  category: { categories, loading },
  match
}) => {
  let restros = [
    ...categories.filter(x => x.parent == match.params.id && x.id !== 15)
  ];
  const getRestros = () => {
    restros = categories.filter(
      x => x.parent == match.params.id && x.id !== 15
    );
  };
  useEffect(() => {
    getFoodHubs();
    getRestros();
  }, [getRestros, getFoodHubs]);

  let data = restros;
  const unique = [...new Set(data.map(item => item.description))];

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

  return loading ? (
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
                  <img
                    className='content'
                    key={item.id}
                    alt=''
                    src={item.image && item.image.src}
                  />
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
  getFoodHubs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(mapStateToProps, {
  getFoodHubs
})(SingleFoodHub);
