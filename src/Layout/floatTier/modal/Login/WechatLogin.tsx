import { Spin, message } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useRootStore, useMount } from "@/hooks";
import { WxLoginWrapper } from "./styled";
import { useState } from "react";
import { getLoginStatusApi, getWxQrCodeApi } from "./api";

function WechatLogin() {
  const [QrCode, setQrCode] = useState("");

  const { setGlobalState } = useRootStore();

  useMount(() => {
    getWxQrCodeApi().then((res) => {
      setQrCode(res.data.qrUrl);

      const timer = setInterval(() => {
        getLoginStatusApi().then((res) => {
          if (res.username) {
            clearInterval(timer);

            setGlobalState({
              loginState: true,
              userInfo: res,
              loginModal: false,
              loginType: "login",
            });
            setQrCode("");
            return message.success("登录成功");
          }
        });
      }, 1000);
    });
  });

  return (
    <WxLoginWrapper>
      <div className="wxHeader">
        <LeftOutlined
          className="wxHeader-back"
          onClick={() => setGlobalState({ loginType: "login" })}
        />

        <h2>请使用微信扫码登陆</h2>
      </div>
      <div className="wxQrCode">
        <Spin spinning={!QrCode} tip="二维码生成中">
          <img src={QrCode} alt="" />
        </Spin>
      </div>
    </WxLoginWrapper>
  );
}

export default WechatLogin;
