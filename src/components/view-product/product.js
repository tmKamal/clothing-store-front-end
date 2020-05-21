import React, { useEffect, Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProduct } from "../../actions/products";
import WishListIcon from "../wishlist-icon/wishlist-icon";
import CustomButton from "../../components/custom-button/custom-button.component";
import "./product.styles.scss";
import StarRating from "../star-rating/star-rating.component";
const Product = ({ product, productLoading, getProduct }) => {
  let { id } = useParams();
  const [size, changeSize] = useState("L");
  useEffect(() => {
    getProduct(id);
  }, [getProduct, id]);

  return (
    <div className='view-product'>
      {productLoading ? (
        <div>Loading</div>
      ) : (
        <Fragment>
          <div
            className='product-image'
            style={{
              backgroundImage: `url(${product.image})`,
            }}
          />
          <div className='product-details'>
            <span className='title'>
              {product.category.name} - {product.name}{" "}
              {product.qty <= 30 ? (
                <span className='hot-product'>HOT ITEM</span>
              ) : (
                ""
              )}
            </span>

            <span className='review-count'>
              <StarRating size={20} disable={true} rate={5} />
              {product.rating.length === 0
                ? "No reviews yet"
                : `${product.rating.length} reviews`}{" "}
             
            </span>
            <hr />
            <span className='availableqty'>
              {product.qty <= 30 ? "Only " : ""}
              {product.qty} - Items available{" "}
            </span>
            <span className='price'>
              {product.discount ? (
                <span>
                  {" "}
                  Discounted price{" "}
                  <span className='cutprice'>LKR {product.price}</span>
                </span>
              ) : (
                ""
              )}{" "}
              <span className={product.discount ? "newprice" : ""}>
                LKR{" "}
                {product.discount
                  ? product.price - product.discount
                  : product.price}
              </span>
            </span>
            <hr />
            <span className='size'>
              <span>Size</span>

              <span
                className={`size-option ${size === "S" ? "selected" : ""}`}
                onClick={() => changeSize("S")}
              >
                S
              </span>
              <span
                className={`size-option ${size === "M" ? "selected" : ""}`}
                onClick={() => changeSize("M")}
              >
                M
              </span>
              <span
                className={`size-option ${size === "L" ? "selected" : ""}`}
                onClick={() => changeSize("L")}
              >
                L
              </span>
              <span
                className={`size-option ${size === "XL" ? "selected" : ""}`}
                onClick={() => changeSize("XL")}
              >
                XL
              </span>
              <span
                className={`size-option ${size === "XXL" ? "selected" : ""}`}
                onClick={() => changeSize("XXL")}
              >
                XXL
              </span>
            </span>
            <div className='wrapper'>
              <div className='addtocart-button'>
                <CustomButton>Add to cart</CustomButton>
                <CustomButton inverted>Buy now</CustomButton>
                <WishListIcon classname='wishlist-icon' product={id} />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

Product.propTypes = {
  getProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.products.product,
  productLoading: state.products.productLoading,
});

export default connect(mapStateToProps, { getProduct })(Product);
