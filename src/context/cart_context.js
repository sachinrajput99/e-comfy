import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

//getting item out of local storage
const getLocalStorage = () => {
  let cart = localStorage.getItem("cart"); //cart= item in the local storage
  //local-storage stores data in form of array of objects
  if (cart) {
    //if we have item in cart
    return JSON.parse(localStorage.getItem("cart")); //return the data into to local storage
  } else {
    return [];
  }
};
const initialState = {
  cart: getLocalStorage(), //getting th value from the local storage
  total_items: 0,
  total_amount: 0,
  shipping_fee: 543,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //add to cart
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };
  // remove item
  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };
  // toggle amount
  const toggleAmount = (id, value) => {
    // console.log(id, value);
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };
  // clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  //  when state.cart changes we set the value of state cart to the local storage
  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    // console.log(state);
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
