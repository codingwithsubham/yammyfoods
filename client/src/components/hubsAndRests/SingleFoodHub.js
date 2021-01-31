import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getRestrosByFoodhub, getFoodHubs } from '../../actions/category';
import { connect } from 'react-redux';
import DummyHub from './DummyHub';
import { Link } from 'react-router-dom';
import { scroller } from 'react-scroll';

const SingleFoodHub = ({
  getRestrosByFoodhub,
  getFoodHubs,
  category: { categories, restros, loading },
  match,
}) => {
  useEffect(() => {
    getRestrosByFoodhub(match.params.id);
    getFoodHubs();
  }, [getRestrosByFoodhub, match.params.id, getFoodHubs]);

  let data = restros && restros.filter((x) => x.foodHub === match.params.id);

  let restroByHubs = data && data[0] && data[0].restros;

  const unique = [
    ...new Set(restroByHubs && restroByHubs.map((item) => item.description)),
  ];

  const scrollToId = (name) => {
    scroller.scrollTo(name, {
      activeClass: 'active',
      duration: 500,
      delay: 100,
      smooth: true,
      spy: true,
      offset: -120,
    });
    showHide('hover-content');
  };

  const showHide = (id) => {
    let elmnt = document.getElementById(id);
    let ovrly = document.getElementById('overlay');
    if (elmnt) {
      if (elmnt.style.display === 'block') {
        elmnt.style.display = 'none';
        ovrly.style.display = 'none';
      } else {
        elmnt.style.display = 'block';
        ovrly.style.display = 'block';
      }
    }
  };

  let foodHub =
    categories && categories.filter((x) => x.id == match.params.id)[0];

  return (
    <Fragment>
      <div className='food-hubs-header'>
        <div className='food-hubs-content'>
          <div className='near-me'>
            <i className='material-icons'>near_me</i> Food Hub
          </div>
          <div className='hub-name'>{foodHub && foodHub.name}</div>
          <p>
            Ordering From Your Nearest Hub will cause the lower delivery charge
          </p>
        </div>
      </div>
      {loading || !restroByHubs ? (
        <Fragment>
          <DummyHub />
          <DummyHub />
        </Fragment>
      ) : (
        unique &&
        restroByHubs && (
          <Fragment>
            <div className='all-hubs'>
              {unique.map((tag, idx) => (
                <Fragment key={idx}>
                  <div id={tag} className='header'>
                    {tag}
                  </div>
                  {restroByHubs
                    .filter((x) => x.description === tag)
                    .map(
                      (item) =>
                        item.image &&
                        item.image.src && (
                          <Link key={item.id} to={`/restro/${item.id}`}>
                            <img
                              className='content'
                              alt=''
                              src={item.image && item.image.src}
                            />
                          </Link>
                        )
                    )}
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
      )}
    </Fragment>
  );
};

SingleFoodHub.propTypes = {
  getRestrosByFoodhub: PropTypes.func.isRequired,
  getFoodHubs: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, {
  getRestrosByFoodhub,
  getFoodHubs,
})(SingleFoodHub);
