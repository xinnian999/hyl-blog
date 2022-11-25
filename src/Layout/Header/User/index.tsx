import { Avatar, Button, Space } from "antd";
import { Popover } from "@arco-design/web-react";
import { clearLogin } from "@/utils";
import { useRedux } from "@/hooks";
import "./style.scss";

function User() {
  const { store } = useRedux();

  const { username, id, headPicture } = store.userInfo;

  const renderUserMenus = (
    <Space direction="vertical">
      <div className="username">昵称 : {username}</div>

      <Button onClick={clearLogin}>退出登录</Button>
    </Space>
  );

  return (
    <>
      <Popover content={renderUserMenus} trigger="hover">
        <Avatar src={headPicture} className="userAvatar" />
      </Popover>
    </>
  );
}

export default User;
