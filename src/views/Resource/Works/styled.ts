import styled from "styled-components";

export const WorkWrapper = styled.div`
  padding: 30px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  .item {
    width: 45%;
    height: 300px;
    background-color: antiquewhite;
    border-radius: 15px;
    padding: 40px;
    transition: 0.5s all;
    color: rgb(221, 49, 49);
    position: relative;
    cursor: pointer;
    margin-bottom: 40px;
    box-sizing: border-box;

    .title {
      font-size: 35px;
      font-weight: bold;
      padding-bottom: 5px;
      letter-spacing: 5px;
      text-shadow: 0px 0px 5px #fff;
    }

    hr {
      margin: 5px 0 10px;
      height: 3px;
      background-color: rgb(221, 49, 49);
      display: none;
    }

    .autograph {
      display: none;
      font-size: 25px;
      text-shadow: 0px 0px 5px #fff;
      font-weight: bold;
    }

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 0 10px rgb(0 0 0 / 50%);

      .autograph,
      hr {
        display: block;
      }
      /* .autograph,
      .title {
        text-shadow: 1px 1px #fff;
      } */
      &::before {
        display: block;
      }
    }

    @media screen and (max-width: 800px) {
      width: 100%;
      height: 200px;
      .title {
        letter-spacing: 0;
      }
    }
  }
`;
