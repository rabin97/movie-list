import styled from "styled-components";
import star from "../assets/star.svg";

export const StarRatingDiv = styled.div`
  .starWrapper {
    filter: drop-shadow(0px 0px 1px gray);
    justify-content: center;
    text-align: center;
  }

  .star,
  .activeStar {
    cursor: pointer;
    float: left;
    height: 2rem;
    width: 2rem;
    background: url(${star});
    background-repeat: no-repeat;
    background-size: 100%;
    margin: 0.3rem;
 
  }

  .activeStar {
  color:gold
  }

  input[type="radio"] {
    display: none;
  }
`;
