import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { searchProduct } from '../../actions/products';
import { searchRestro } from '../../actions/category';
import { connect } from 'react-redux';
import ProductsCard from '../all_products/ProductsCard';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link } from 'react-router-dom';

const SearchFoods = ({
  searchProduct,
  products: { searchProductData },
  category: { searchRestroData },
  searchRestro,
}) => {
  const [srchData, setSrchData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    searchProduct(srchData);
    searchRestro(srchData);
  };

  return (
    <Fragment>
      <div className='srch-pge'>
        <div className='srch-pge-form'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className='checkout-inputs'>
              <span>Search for Foods / Restros</span>
              <input
                type='text'
                value={srchData}
                onChange={(e) => setSrchData(e.target.value)}
                required
                autoFocus
              />
            </div>
            <button type='submit' className='btn'>
              Search
            </button>
          </form>
        </div>
        <div className='srch-rslts'>
          <Tabs>
            <TabList>
              <Tab>Dishes</Tab>
              <Tab>Restros</Tab>
            </TabList>
            <TabPanel>
              {searchProductData && searchProductData.length > 0 ? (
                searchProductData.map((product, idx) => (
                  <ProductsCard product={product} key={idx} />
                ))
              ) : (
                <Fragment>
                  <img
                    alt='yammyfoods'
                    className='no-rslts'
                    src={require('../../static/noresults.gif')}
                  />
                  <h3>No Results!! Start Typing</h3>
                </Fragment>
              )}
            </TabPanel>
            <TabPanel>
              {searchRestroData && searchRestroData.length > 0 ? (
                searchRestroData.map((item) => (
                  <Link key={item.id} to={`/food-hub/${item.id}`}>
                    <img alt='' src={item.image && item.image.src} />
                  </Link>
                ))
              ) : (
                <Fragment>
                  <img
                    alt='yammyfoods'
                    className='no-rslts'
                    src={require('../../static/noresults.gif')}
                  />
                  <h3>No Results!! Start Typing</h3>
                </Fragment>
              )}
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </Fragment>
  );
};

SearchFoods.propTypes = {
  searchProduct: PropTypes.func.isRequired,
  products: PropTypes.object,
  category: PropTypes.object,
  searchRestro: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
  category: state.category,
});

export default connect(mapStateToProps, {
  searchProduct,
  searchRestro,
})(SearchFoods);
