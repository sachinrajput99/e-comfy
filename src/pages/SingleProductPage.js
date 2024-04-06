import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  //getting id out of params(url)
  // { params(url) is set by using link tag , dynamically passing the id  }
  const { id } = useParams(); //id =>product component=>

  // getting single product data (from #api call through #context_api )
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`); //we will have to give urls+id so as to fetch aSingle Product data
  }, [id]);
  // whenever id changes component renders again

  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      if (error) {
        history.push("/"); //redirect to home page
      }
    }, 3000);
  }, [error]); //error in dependence as error when we start fetching is false
  // after fetching error its decided whether error is true or false
  // when error is changes from false to true
  // {useEffect 's code run =>settime out runs and history.push (dynamically navigate) to homepage after 3sec(redirects to home page )}

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    images,
  } = product;

  // specific name ,price ,description as per single product

  return (
    <Wrapper>
      {/* page her component */}
      <PageHero title={name} product={product} />

      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to product
        </Link>
        <div className="product-center">
          {/* product image component */}
          <ProductImages images={images} />

          <section className="content">
            <h2>{name}</h2>

            {/* stars component */}
            <Stars stars={stars} reviews={reviews} />

            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available:</span>
              {stock > 0 ? "In stock" : "out of stock"}
            </p>
            <p className="info">
              <span>SKU:</span>
              {sku}
            </p>
            <p className="info">
              <span>Brand:</span>
              {company}
            </p>
            <hr />

            {/* if stocks greater than 0 then return add to cart component */}
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
