import PropTypes from 'prop-types';
// material
import ShopProductCard from './ProductCard';
import Masonry from 'react-masonry-css';
import './style.css';
// ----------------------------------------------------------------------
import { MotionContainer, varBounceInRight } from '../../Component/animate';
import { motion } from 'framer-motion';

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ products, ...other }) {
  return (
    <MotionContainer initial="initial" open>
      <motion.div variants={varBounceInRight}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          <Masonry
            breakpointCols={{
              default: 4,
              1920: 5,
              1600: 4,
              1366: 3,
              1280: 4,
              960: 3,
              600: 2,
              480: 1,
            }}
            className="my-masonry-grid flex w-full"
            columnClassName="my-masonry-grid_column w-full flex flex-col"
          >
            {products.map((product) => (
              <ShopProductCard key={product.idsach} product={product} />
            ))}
          </Masonry>
        </div>
      </motion.div>
    </MotionContainer>
  );
}
