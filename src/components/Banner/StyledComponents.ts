import styled from "styled-components";

const Banner = styled.div`
  height: 100%;
  background-color: gray;
  position: absolute;
  width: 100%;
  /* opacity: 0.9; */
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0, var(--ant-primary-2)),
    color-stop(1, var(--ant-primary-9))
  );
  /* display: flex; */
`;

export { Banner };
