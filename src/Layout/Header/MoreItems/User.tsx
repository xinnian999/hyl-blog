import { Button, Avatar } from "antd";
import { clearLogin } from "@/utils";
import { useRedux } from "@/hooks";
import { memo } from "react";
import { Popover } from "@/components";
import { UserWrapper } from "./styled";
import Item from "./Item";

function Login() {
  const { store, dispatch } = useRedux();
  const { loginState } = store;
  const { username, headPicture } = store.userInfo;

  const onLogin = () =>
    dispatch({
      type: "CHANGE_LOGIN_MODAL",
      payload: true,
    });

  return loginState ? (
    <Popover
      content={
        <UserWrapper direction="vertical" size={20}>
          <Avatar src={headPicture} size={35} />
          <p>昵称 : {username}</p>
          <p>特权 : vip</p>
          <Button onClick={clearLogin} size="small">
            退出登录
          </Button>
        </UserWrapper>
      }
    >
      <Item type="icon-denglu-copy" />
    </Popover>
  ) : (
    <Item type="icon-denglu-copy" tip="登陆" onClick={onLogin} />
  );
}

export default memo(Login);
