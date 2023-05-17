import { Spin, message } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useMount, useRedux } from "@/hooks";
import { WxLoginWrapper } from "./styled";
import context from "./context";
import { useContext, useState } from "react";
import { getLoginStatusApi, getWxQrCodeApi } from "./api";

function WechatLogin() {
  const [QrCode, setQrCode] = useState("");

  const { batchDispatch } = useRedux();

  const { setType } = useContext(context);

  useMount(() => {
    getWxQrCodeApi().then((res) => {
      setQrCode(res.data.qrUrl);

      const timer = setInterval(() => {
        getLoginStatusApi().then((res) => {
          if (res.username) {
            clearInterval(timer);
            batchDispatch([
              {
                type: "CHANGE_LOGIN_STATE",
                payload: true,
              },
              {
                type: "CHANGE_USER_INFO",
                payload: res,
              },
              { type: "CHANGE_LOGIN_MODAL", payload: false },
            ]);
            setType("login");
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
          onClick={() => setType("login")}
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
