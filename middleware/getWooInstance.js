const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

module.exports = function(location) {
  if (location.toLowerCase() === 'ghatal') {
    //if Ghatal
    const WooCommerce = new WooCommerceRestApi({
      url: 'https://order.yammyfoods.in',
      consumerKey: 'ck_dc8dad5098d39337e95edb17b2f39867e2bf09ab',
      consumerSecret: 'cs_44a85a5cc16d5998b5e0bd24d1b5b6cee4388ec1',
      version: 'wc/v3'
    });
    return WooCommerce;
  } else if (location.toLowerCase() === 'haldia') {
    //if Haldia
    const WooCommerce = new WooCommerceRestApi({
      url: 'https://haldia.yammyfoods.in',
      consumerKey: 'ck_200a62a4b56949d889fd2d202bd903d0b6783bb0',
      consumerSecret: 'cs_15daaccd711864d882fdd6a658c4a008fb1db1ef',
      version: 'wc/v3'
    });
    return WooCommerce;
  }
};
