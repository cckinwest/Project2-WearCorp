const { Product } = require('../models');

const productData = [
  {
    product_name: 'BAPE College Tee Men',
    price: 76.0,
    stock: 15,
    category_id: 1,
    imgurl: 'Bape-College-Tee-Black.jpg',
    description:
      'BAPE runs approximately one size small compared to traditional US sizing. We recommend moving up at least one whole size when purchasing a BAPE piece of clothing.',
  },
  {
    product_name: 'Stussy Basic T-shirt Men',
    price: 50.0,
    stock: 22,
    category_id: 1,
    imgurl: 'tees-stussy-womensmens-basic-stc3bcssy-pigment-dyed-tee-blue.jpg',
    description:
      'The Stussy Basic T-Shirt is a blue tee with white prints made of skin-friendly and breathable 100% cotton fabric. The Stussy Basic T-Shirt Blue has a crew neck with a closed seam.',
  },
  {
    product_name: 'Supreme Ronin Tee Men',
    price: 65.0,
    stock: 12,
    category_id: 1,
    imgurl: 'supreme-ronin.jpg',
    description:
      'Supreme has joined forces with DC Ronin for a limited collection featuring written and drawn by the legendary Frank Miller - renowned for his comic book stories and graphic novels. .',
  },
  {
    product_name: 'Stussy Kittens Tee Men',
    price: 76.0,
    stock: 25,
    category_id: 1,
    imgurl: 'stussy-kittens.jpg',
    description: '',
  },
  {
    product_name: 'Eric Emanuel EE Basic Short Men',
    price: 23.0,
    stock: 22,
    category_id: 2,
    imgurl: 'Eric-Emanuel-EE-Basic-Short-Black-Black.jpg',
    description: '',
  },
  {
    product_name: 'Eric Emanuel x BAPE Miami Basic Short Men',
    price: 29.99,
    stock: 22,
    category_id: 2,
    imgurl: 'Eric-Emanuel-EE-Basic-Short-Black-Black.jpg',
    description: '',
  },
  {
    product_name: 'Fear of God Essentials Sweatshort Men',
    price: 29.99,
    stock: 22,
    category_id: 2,
    imgurl: 'Fear-of-God-Essentials.jpg',
    description: '',
  },
  {
    product_name: 'Fear of God Essentials Volley Shorts',
    price: 39.99,
    stock: 22,
    category_id: 2,
    imgurl: 'FEAR-OF-GOD-ESSENTIALS-Volley-Shorts-Moss.jpg',
    description: '',
  },
  {
    product_name: 'Off-White Catalina Rect Frame Sunglasses Men',
    price: 187.0,
    stock: 22,
    category_id: 3,
    imgurl: 'OFF-WHITE-Catalina-Rectangular-Frame-Sunglasses.jpg',
    description: '',
  },
  {
    product_name: 'Louis Vuitton Sunglasses Cyclone Men',
    price: 686.0,
    stock: 25,
    category_id: 3,
    imgurl: 'Louis-Vuitton-Sunglasses-Cyclone-Black-Black.jpg',
    description: '',
  },
  {
    product_name: 'Ray-Ban Clubmaster Sunglasses Men',
    price: 127.0,
    stock: 22,
    category_id: 3,
    imgurl: 'rayban-clubmaster.jpg',
    description: '',
  },
  {
    product_name: 'Dior DIORCLUB M1U Sunglasses',
    price: 570,
    stock: 28,
    category_id: 3,
    imgurl: 'Dior-DIORCLUB-M1U-Sunglasses-Navy-Blue.jpg',
    description: '',
  },
  {
    product_name: 'Nike Air Force 1 Low',
    price: 63,
    stock: 88,
    category_id: 4,
    imgurl: 'Nike-Air-Force-1-Low-LE-Triple-White-GS-Product.jpg',
    description: '',
  },
  {
    product_name: 'adidas Yeezy Slide',
    price: 80,
    stock: 45,
    category_id: 4,
    imgurl: 'adidas-Yeezy-Slide-Black-Product.jpg',
    description: '',
  },
  {
    product_name: 'Dior B23 Low Top',
    price: 786,
    stock: 5,
    category_id: 4,
    imgurl: 'Dior-B23-Low-Top-Logo-Oblique-Product.jpg',
    description: '',
  },
  {
    product_name: 'Dior B27 Low',
    price: 879,
    stock: 3,
    category_id: 4,
    imgurl: 'Dior-B27-Low-Gray-White-Product.jpg',
    description: '',
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
