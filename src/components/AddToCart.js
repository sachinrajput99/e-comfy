import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";
import { BsListNested } from "react-icons/bs";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();

  const { stock, id, colors } = product;

  // main color set to 1st item(color) in colors array
  const [mainColor, SetMainColor] = useState(colors[0]);

  // initially the amount is set to 1

  // then the amount changes upto to the value of stock
  const [amount, SetAmount] = useState(1);

  const increase = () => {
    SetAmount((oldAmount) => {
      let tempAmount = oldAmount + 1;
      if (tempAmount > stock) {
        tempAmount = stock;
      }
      return tempAmount;
    });
  };

  const decrease = () => {
    SetAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  };

  return (
    <Wrapper>
      <div className="colors">
        <span>colors:</span>

        <div>
          {colors.map((color, index) => {
            //creates element as per color in colors array
            return (
              <button
                key={index}
                style={{ background: color }} //backgroundColor set to 1st color(selected color)
                className={`${
                  mainColor === color ? "color-btn active" : "color-btn"
                }`} // for 1st element in colors array = 1st created element selected then active(opacity 1) otherwise opacity0.5
                onClick={() => SetMainColor(color)} //sets mainColor to particular selected color
              >
                {mainColor === color ? <FaCheck /> : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="btn-container">
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <Link
          to="/cart"
          className="btn"
          onClick={() => addToCart(id, mainColor, amount, product)}
        >
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
