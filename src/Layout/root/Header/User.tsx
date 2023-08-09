import { Button, Avatar } from "antd";
import { clearLogin } from "@/utils";
import { useGlobalStore } from "@/hooks";
import { memo } from "react";
import { Icon, Popover } from "@/components";
import { UserInfoWrapper, UserWrapper } from "./styled";

function Login() {
  const { loginState, userInfo, setGlobalState } = useGlobalStore();

  const { username, headPicture } = userInfo;

  const onLogin = () => {
    setGlobalState({ loginModal: true });
  };

  return (
    <UserWrapper>
      {loginState ? (
        <Popover
          content={
            <UserInfoWrapper>
              <li>昵称 : {username}</li>
              <li>特权 : vip</li>
              <li>
                <Button onClick={clearLogin} size="small">
                  退出登录
                </Button>
              </li>
            </UserInfoWrapper>
          }
        >
          <Avatar src={headPicture} />
        </Popover>
      ) : (
        <Avatar icon={<Icon type="icon-denglu-copy" />} onClick={onLogin} />
      )}
    </UserWrapper>
  );
}

export default memo(Login);
