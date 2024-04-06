import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";
import Sort from "../components/Sort";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  // default value of filters
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState); //sets filter_products = products also, all_products = products

  //👇use effect  function below
  // important==> useEffect only dispatches the action   when the products changes as initially its an empty array then
  // after fetching data (it becomes array of objects  (which is our data))

  //initially product =[] then after fetching data=>[{},{}] (array of object)

  // as products value changes then again dispatch action invokes

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  // sets grid to true
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  // sets grid to false
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  //sorting based on value in select /option
  const updateSort = (e) => {
    // const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    // value here is the=> value in option/select
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "category") {
      value = e.target.textContent; //getting value out of text content of button
    }
    if (name === "color") {
      value = e.target.dataset.color; //getting value out of data attribute of  button
    }

    if (name === "price") {
      value = Number(value); //getting range value  as number as default it provides in string
    }
    if (name === "shipping") {
      value = e.target.checked;
    }
    // console.log(name, value);
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  // console.log(products);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
