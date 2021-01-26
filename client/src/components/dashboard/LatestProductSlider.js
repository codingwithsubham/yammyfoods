import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getLatestproducts } from '../../actions/products';
import { connect } from 'react-redux';

const LatestProductSlider = ({
  getLatestproducts,
  products: { products, loading },
}) => {
  useEffect(() => {
    getLatestproducts();
  }, [getLatestproducts]);

  let slider = [1, 2, 3, 4, 5];

  var slideIndex = 0;
  showSlides();

  function showSlides() {
    var i;
    var slides = document.getElementsByClassName('mySlides');
    var dots = document.getElementsByClassName('dot');
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    if (slides[slideIndex - 1]) {
      slides[slideIndex - 1].style.display = 'block';
    }
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].className += ' active-slide';
    }
    setTimeout(showSlides, 6000);
  }

  return (
    products &&
    (loading ? (
      <div className='dmy-slider'></div>
    ) : (
      <Fragment>
        <div className='slideshow-container'>
          {slider.map((item, idx) => (
            <div key={idx} className='mySlides slide'>
              <img
                alt=''
                src={require(`../../sliders/abb${item}.jpg`)}
                style={{ width: '100%' }}
              />
            </div>
          ))}
        </div>
      </Fragment>
    ))
  );
};

LatestProductSlider.propTypes = {
  products: PropTypes.object.isRequired,
  getLatestproducts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { getLatestproducts })(
  LatestProductSlider
);
