import { Image } from "antd";
import { InsertRowAboveOutlined } from "@ant-design/icons";
import "./style.scss";

interface isProps {
  picture: string;
  [key: string]: any;
}

export default function Card({ picture, title, autograph, onClick }: isProps) {
  return (
    <div className="cardContainer" onClick={onClick}>
      <Image src={picture} className="image" />
      <div className="title">{title}</div>
      <p className="autograph">{autograph}</p>
      <div className="time">
        {" "}
        <InsertRowAboveOutlined className="iconAbove" /> 06-19
      </div>
    </div>
  );
}
