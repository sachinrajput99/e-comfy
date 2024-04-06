import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((product) => product.price); // getting the prices array as soon as products are available to products page
    maxPrice = Math.max(...maxPrice); //gets the max price from array of prices

    return {
      ...state,
      all_products: [...action.payload], //using spread operator (which is copying the value in the action.payload) not referencing to the same place in memory
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice }, //filters state returned
    };
  }
  // sorting
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }

  // updating sort-by value
  if (action.type === UPDATE_SORT) {
    // console.log(action.payload);
    return {
      ...state,
      sort: action.payload,
    };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];

    //taking action based on sort-by value
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => {
        // if a.price is les than it is placed before b.price
        if (a.price < b.price) {
          return -1;
        }
        // if a.price is greater than it is placed after b.price
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      });
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }

    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filtered_products: tempProducts };
  }
  // filters
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return {
      ...state,
      filters: { ...state.filters, [name]: value }, //dynamically setting upt he properties(or over-writing the initial state)
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    // console.log("..........filtering the products");

    const { all_products } = state;
    // console.log(all_products);//array of object
    const { text, category, company, color, price, shipping } = state.filters;

    let tempProducts = [...all_products]; //copying the value from original products
    //filtering
    // text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    // category
    if (category !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      );
    }
    // company
    if (company !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      );
    }
    //colors
    if (color !== "all") {
      tempProducts = tempProducts.filter((product) => {
        // console.log(product);
        // console.log(product.colors); //an array
        // console.log(color);
        return product.colors.find((c) => c === color);
      });
    }
    // price
    tempProducts = tempProducts.filter((product) => product.price <= price);

    //  shipping
    if (shipping) {
      tempProducts = tempProducts.filter(
        (product) => product.shipping === true
      );
    }

    return { ...state, filtered_products: tempProducts }; //setting filtered product =tempProduct as we are using filtered products every where to display products
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        // min_price: 0,
        // max_price: 0,
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
