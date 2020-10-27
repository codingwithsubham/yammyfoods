import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProductsByRestroId, getRestroById } from '../../actions/category';
import { connect } from 'react-redux';
import DummyHub from '../hubsAndRests/DummyHub';
import MenuItem from '../hubsAndRests/MenuItems';
import { scroller } from 'react-scroll';
import StarRatings from 'react-star-ratings';

const SingleRestros = ({
  getProductsByRestroId,
  getRestroById,
  products: { products, loading },
  category: { category },
  match
}) => {
  useEffect(() => {
    getProductsByRestroId(match.params.id);
    getRestroById(match.params.id);
  }, [getRestroById, getProductsByRestroId, match.params.id]);

  let data = products;
  const unique = [...new Set(data.map(item => item.tags && item.tags[0].name))];

  const overallRating = () => {
    let rating = 0;
    let devider = 0;
    products &&
      products.forEach(element => {
        if (element.average_rating > 0) {
          rating = rating + parseFloat(element.average_rating);
          devider++;
        }
      });
    return rating / devider;
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
      if (elmnt.style.display === 'block') {
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
      <DummyHub />
    </Fragment>
  ) : products && category ? (
    <Fragment>
      <div className='single-restro-wrapper'>
        <div
          className='restro-header'
          style={{
            backgroundImage: `url('${products &&
              products[0].images &&
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
              {overallRating().toFixed(2)} - Overall
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
                .filter(item => item.tags && item.tags[0].name === tag)
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
      </div>
    </Fragment>
  ) : (
    <Fragment />
  );
};

SingleRestros.propTypes = {
  getProductsByRestroId: PropTypes.func.isRequired,
  getRestroById: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  products: state.products,
  category: state.category
});

export default connect(mapStateToProps, {
  getProductsByRestroId,
  getRestroById
})(SingleRestros);
