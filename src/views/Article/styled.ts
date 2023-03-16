import styled from "styled-components";

export const ArticleSkeleton = styled.div`
  display: flex;
  height: 220px;
  background-color: var(--background-color);
  padding: 15px;
  border-radius: 10px;
  .image {
    width: 250px !important;
    height: 100% !important;
    margin-right: 10px;
  }
`;
