import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getRestrosById, getFoodHubs } from '../../actions/category';
import { connect } from 'react-redux';
import DummyHub from '../hubsAndRests/DummyHub';
import MenuItem from '../hubsAndRests/MenuItems';
import { scroller } from 'react-scroll';
import StarRatings from 'react-star-ratings';

const SingleRestros = ({
  getRestrosById,
  getFoodHubs,
  products: { products, loading },
  category: { categories },
  match
}) => {
  useEffect(() => {
    getRestrosById(match.params.id);
    getFoodHubs();
  }, [getFoodHubs, getRestrosById, match.params.id]);

  let data = products;
  const unique = [...new Set(data.map(item => item.tags && item.tags[0].name))];

  let category =
    categories && categories.filter(x => x.id == match.params.id)[0];

  const overallRating = () => {
    let rating = 0;
    products &&
      products.forEach(element => {
        rating = rating + parseFloat(element.average_rating);
      });
    return rating;
  };

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

  return loading || !products ? (
    <Fragment>
      <DummyHub />
      <DummyHub />
      <DummyHub />
    </Fragment>
  ) : products && category ? (
    <Fragment>
      <div
        className='restro-header'
        style={{
          backgroundImage: `url('${products[0].images &&
            products[0].images[0] &&
            products[0].images[0].src}')`
        }}
      >
        <div className='restro-desc'>
          <div className='rest-cat'>{category.description}</div>
          <div className='rest-name'>{category.name}</div>
          <div className='rest-rat'>
            <StarRatings
              rating={overallRating()}
              starRatedColor='#FFC107'
              numberOfStars={5}
              name='rating'
              starDimension='20px'
              starSpacing='2px'
            />{' '}
            {overallRating()} - Overall
          </div>
        </div>
      </div>
      <div className='all-hubs'>
        {unique.map((tag, idx) => (
          <Fragment key={idx}>
            <div id={tag} className='header'>
              {tag}
            </div>
            {products
              .filter(item => item.tags && item.tags[0].name == tag)
              .map(item => (
                <MenuItem key={item.id} product={item} />
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
            <i className='material-icons icon-rest-menu'>restaurant_menu</i>{' '}
            Menu
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
  ) : (
    <Fragment />
  );
};

SingleRestros.propTypes = {
  getRestrosById: PropTypes.func.isRequired,
  getFoodHubs: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  products: state.products,
  category: state.category
});

export default connect(mapStateToProps, {
  getRestrosById,
  getFoodHubs
})(SingleRestros);
