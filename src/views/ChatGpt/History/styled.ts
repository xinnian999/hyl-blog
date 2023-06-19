import styled from "styled-components";

export const HistoryWrapper = styled.div`
  width: 30%;
  background-color: #001529;
  text-align: center;
  padding-top: 20px;
`;

export const HistoryList = styled.ul`
  background-color: #001529;
  text-align: left;
  padding-top: 20px;
  color: #fff;
`;

export const LabelWrapper = styled.li<{ active: boolean }>`
  position: relative;
  line-height: 40px;
  padding: 0 15px;
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? "var(--ant-primary-color)" : "transparent"};
  &:hover .action {
    display: block;
  }
  .action {
    position: absolute;
    right: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0 20px;
    display: none;
  }
  .icon {
    vertical-align: middle;
    font-size: 18px !important;
    &:hover {
      color: var(--ant-primary-color);
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

export const InputField = styled.input`
  flex: 1;
  border: none;
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
`;
