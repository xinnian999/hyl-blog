import { Button, Space, Avatar, Popover } from "antd";
import { clearLogin } from "@/utils";
import { useRedux, useWindowSize } from "@/hooks";
import { memo } from "react";
import LoginModal from "./LoginModal";

function Login() {
  const { store, dispatch } = useRedux();
  const { width } = useWindowSize();
  const { username, headPicture } = store.userInfo;

  const renderUserMenus = (
    <Space direction="vertical">
      <div className="username">昵称 : {username}</div>

      <Button onClick={clearLogin}>退出登录</Button>
    </Space>
  );

  return (
    <>
      {store.loginState ? (
        <Popover content={renderUserMenus} trigger="hover" placement="bottom">
          <Avatar src={headPicture} size={width > 800 ? 35 : 30} />
        </Popover>
      ) : (
        <Avatar
          size={width > 800 ? 40 : 30}
          className="pointer"
          onClick={() =>
            dispatch({ type: "CHANGE_LOGIN_MODAL", payload: true })
          }
        >
          登录
        </Avatar>
      )}

      <LoginModal />
    </>
  );
}

export default memo(Login);
