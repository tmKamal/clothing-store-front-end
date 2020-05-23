import axios from "axios";

import {
  GET_PRODUCT,
  GET_PRODUCTS,
  PRODUCT_ERROR,
  CLEAR_PRODUCTS,
  CLEAR_PRODUCT,
  SET_RATE,
} from "./types";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//GET PRODUCTS BY CATEGORY
export const getProducts = (catId) => async (dispatch) => {
  dispatch({
    type: CLEAR_PRODUCTS,
  });
  try {
    const res = await axios.get(`/api/product/category/${catId}`);
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProduct = (prodId) => async (dispatch) => {
  dispatch({
    type: CLEAR_PRODUCT,
  });
  try {
    const res = await axios.get(`/api/product/${prodId}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data.product,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText },
    });
  }
};

export const setRate = (rate) => (dispatch) => {
  console.log(rate);
  dispatch({
    type: SET_RATE,
    payload: rate,
  });
};

export const addReview = (prodId, rate, comment) => async (dispatch) => {
  try {
    const body = {};
    body.rate = rate;
    body.comment = comment;

    const res = await axios.patch(
      `/api/product/addreview/${prodId}`,
      body,
      config
    );
    dispatch({
      type: GET_PRODUCT,
      payload: res.data.product,
    });
  } catch (err) {
    console.log(err.response.statusText);
  }
};
