import styled from "styled-components";

export const HomeSideWrapper = styled.div`
  width: 25%;

  .item {
    background-color: #fff;
    border-radius: 15px;
    padding: 10px;
    margin-bottom: 20px;
    box-shadow: var(--box-shadow);
  }

  .avatar {
    padding: 20px 0;
    text-align: center;
  }

  .self {
    p {
      text-align: center;
      font-size: 16px;
    }
  }

  .links {
    display: flex;
    justify-content: space-around;
    padding: 0 15px;
    li {
      border: 1px solid #999;
      width: 45px;
      height: 45px;
      border-radius: 10px;
      font-size: 30px;
      text-align: center;
      line-height: 45px;
    }
  }

  .statistics {
    display: flex;
    justify-content: space-around;
    padding: 0 20px;
    text-align: center;
    p {
      margin-bottom: 0;
    }
    h3 {
      margin-top: 10px;
    }
  }

  .tags {
    /* display: flex; */
    .tag {
      display: inline-block;
      margin-right: 15px;
      margin-bottom: 15px;
      padding: 5px;
      font-size: 16px;
      &:hover {
        cursor: pointer;
        background-color: var(--ant-primary-color);
        border-radius: 5px;
        color: #fff;
      }
      .count {
        font-size: 12px;
        vertical-align: top;
        color: #363636;
      }
    }
  }

  .date {
    li {
      margin-bottom: 5px;
    }
  }
  .gif {
    display: block;
    margin: 25px auto;
    height: 80px;
  }
  .lastWeek {
    text-align: center;
    font-weight: bold;
  }
`;
