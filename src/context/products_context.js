import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

const ProductsContext = React.createContext();

// using useReducer for state management
export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN }); //dispatches the action in the reducer
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };
  // ////////fetching all products
  // state is managed in product reducer
  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN }); //sets loading to true
    try {
      const response = await axios.get(url);
      const products = response.data;
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR }); //sets loading = false and get_products_error= true
    }
  };
  // //////////fetching single product data
  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios.get(url);
      const singleProduct = response.data;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  // fetching all products data
  useEffect(() => {
    fetchProducts(url);
  }, []);

  // state is passed to all component through useContext hook (can also use context api)
  return (
    <ProductsContext.Provider
      // sending state and other value from here so that children components can use them
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

//this (custom hook) helps us in accessing(retrieving) the value in other component
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
