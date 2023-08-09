import styled from "styled-components";

export const HistoryWrapper = styled.div`
  width: 280px;
  background-color: #001529;
  text-align: center;
  padding-top: 20px;
  position: relative;
  .refresh {
    position: absolute;
    right: 10px;
    top: 25px;
  }
`;

export const HistoryList = styled.ul`
  background-color: #001529;
  text-align: left;
  padding: 20px 10px 0;
  color: #fff;
  height: 68vh;
  overflow: auto;
  margin-top: 15px;
`;

export const LabelWrapper = styled.li<{ active: boolean }>`
  position: relative;
  line-height: 40px;
  cursor: pointer;
  display: flex;
  border-radius: 10px;
  padding: 0 10px;
  margin-bottom: 5px;
  background-color: ${(props) =>
    props.active ? "var(--ant-primary-color)" : "transparent"};

  .name {
    flex: 1;
    overflow: hidden;
    margin: 0 10px;
    margin-right: 0;
    white-space: nowrap;
    position: relative;
    .zhao {
      position: absolute;
      right: 0;
      top: 0;
      width: 30px;
      height: 100%;

      background-image: linear-gradient(
        to left,
        var(--ant-primary-color),
        transparent
      );
    }
  }
  .action {
    width: 60px;
    display: flex;
    justify-content: space-around;
    position: relative;
    top: 1px;
    color: #eee;
  }
  .ico {
    /* vertical-align: middle; */
    font-size: 18px !important;
    &:hover {
      color: var(--ant-primary-4);
    }
  }
`;

export const InputWrapper = styled.div`
  padding: 10px;
  text-align: right;
  .sendBtn {
    margin-top: 10px;
    margin-left: 10px;
  }
`;
