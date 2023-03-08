import styled from "styled-components";

export const SentenceContentWapper = styled.div`
  display: flex;
  height: 300px;
  position: relative;
  justify-content: center;
  align-items: center;
  background-attachment: fixed;
  background-size: cover;
  color: #fff;
  text-shadow: 0px 0px 10px black;
  border: 1px solid var(--border-color);
`;
export const SentenceContentBox = styled.div`
  margin: auto;
`;

export const Name = styled.div`
  font-weight: 500;
  width: 100%;
  text-align: center;
  font-size: 35px;
  margin-bottom: 20px;
  letter-spacing: 5px;
`;

export const Lines = styled.p`
  text-align: center;
  letter-spacing: 2px;
`;

export const ChangeBar = styled.div`
  position: absolute;
  bottom: 15px;
  right: 20%;
  @media screen and (max-width: 600px) {
    right: 10%;
  }
`;
