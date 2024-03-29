import styled from 'styled-components';

export const BackgroundWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: -1;
  background-color: #dbdbdb;
  /* background-image: url(${require('@/assets/img/bg/bg0.webp')}); */
`;

function Background() {
  return <BackgroundWrapper id='background'></BackgroundWrapper>;
}

export default Background;
