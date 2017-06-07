import axios from "axios";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_ORDERS = "RECEIVE_ORDERS";
export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS"
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_ORDER = "RECEIVE_ORDER";
export const RECEIVE_PRODUCT = "RECEIVE_PRODUCT"
export const RECEIVE_CART = "RECEIVE_CART"
export const RECEIVE_REVIEWS = "RECEIVE_REVIEWS"
export const RECEIVE_REVIEW = "RECEIVE_REVIEW"

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
})

export const receiveOrders = orders => ({
  type: RECEIVE_ORDERS,
  orders
})

export const receiveProducts = products => ({
  type: RECEIVE_PRODUCTS,
  products
})

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
})

export const receiveProduct = product => ({
  type: RECEIVE_PRODUCT,
  product
})

export const receiveOrder = order => ({
  type: RECEIVE_ORDER,
  order
})

export const receiveCart = cart => ({
  type: RECEIVE_CART,
  cart
})


export const receiveReviews = reviews => ({
  type: RECEIVE_REVIEWS,
  reviews
})

export const receiveReview = review => ({
  type: RECEIVE_REVIEW,
  review
})


export const getUserById = userId => {
  return dispatch => {
    axios.get(`/api/user/${userId}`)
    .then(response => {
      dispatch(receiveUser(response.data));
    });
  }
}

export const getProductById = productId => {
  return dispatch => {
    axios.get(`/api/products/${productId}`)
    .then(response => {
      dispatch(receiveProduct(response.data));
    });
  }
}

export const getOrderById = orderId => {
  return dispatch => {
    axios.get(`/api/order/${orderId}`)
    .then(response => {
      dispatch(receiveOrder(response.data));
    });
  }
}


export const getReviewById = reviewId => {
  return dispatch => {
    axios.get(`/api/review/${reviewId}`)
    .then(response => {
      dispatch(receiveReview(response.data));
    });
  }
}