import styled from "styled-components";

export const PlateBanner = styled.div`
  position: relative;
  height: 11.1111rem;
`;

export const PlateBannerBg = styled.div`
  height: 100%;
  background-size: cover;
  background-position: center;
`;

export const PlateBannerInfo = styled.div`
  color: var(--plate-text-color);
  text-align: center;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-70%);
  z-index: 9;
  h2 {
    font-weight: 500;
    font-size: 0.7407rem;
    margin-bottom: 0.3704rem;
    letter-spacing: 0.0926rem;
    text-shadow: 0rem 0rem 0.1852rem black;
  }
  .autograph {
    font-size: 0.3704rem;
    text-shadow: 0rem 0rem 0.1852rem black;
    padding: 0 0.3704rem;
  }
`;
