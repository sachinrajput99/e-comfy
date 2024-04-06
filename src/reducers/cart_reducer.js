import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    // item with id===id+color
    const tempItem = state.cart.find((item) => item.id === id + color);
    //if item already exist in cart
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    }
    // if item is not in the cart(we create new one with these properties{newItem})=>add item to cart
    else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload); //removes specific item from cart
    return { ...state, cart: tempCart };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }; //clears the cart (as it sets cart to empty array(overwrite the cart value))
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    let { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      // console.log(state);
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if ((value = "dec")) {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      } else {
        return item;
      }
    });

    return { ...state, cart: tempCart };
  }
  if (action.type === COUNT_CART_TOTALS) {
    // changing the value of total_items and total_amount
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        // console.log(cartItem);//individual cart item
        total.total_items = total.total_items + amount; //0+amount(no of item)=total item
        total.total_amount = total.total_amount + price * amount; //0+price*amount=total amount(total price)

        // console.log(total); //total is a n object of total.items and total.total_amount
        return total;
      },
      {
        total_items: 0,
        total_amount: 0,
      }
    );
    return { ...state, total_items, total_amount };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
