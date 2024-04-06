import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import aboutImg from "../assets/hero-bcg.jpeg";

const AboutPage = () => {
  return (
    <main>
      <PageHero title="about" />
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="nice desk" />
        <article>
          <div className="title">
            <h2>our story</h2>
            <div className="underline"></div>
          </div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt
            fuga, blanditiis pariatur deleniti esse veniam culpa optio vitae
            officiis quis itaque molestiae accusamus natus reiciendis nostrum
            nisi? Temporibus, distinctio incidunt. Eius quidem assumenda magni
            dicta quibusdam voluptates iure commodi ipsa tenetur aliquid. Odio
            sapiente hic obcaecati ea, veniam labore fuga mollitia, quibusdam
            neque dignissimos harum deleniti? Aliquid, et! Earum, voluptatibus.
            Odit, eveniet! Numquam, ducimus iure! Id atque nisi cum voluptatem.
            at eos. Sit ullam voluptatem, error perferendis modi reiciendis?
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
