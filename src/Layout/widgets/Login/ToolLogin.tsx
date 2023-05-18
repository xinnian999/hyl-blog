import { useRedux } from "@/hooks";
import { Divider } from "antd";
import { cookie } from "hyl-utils";
import { ToolLoginBar } from "./styled";

const qqLogin = () => {
  window.open(
    `https://graph.qq.com/oauth2.0/authorize?client_id=102011435&state=${cookie.get(
      "csrf_token"
    )}&response_type=code&redirect_uri=https://www.hyl999.co/api/qq/qqLoginCallback`,
    "_self"
  );
};

export default function ToolLogin() {
  const { batchDispatch } = useRedux();

  const wxLogin = () => {
    batchDispatch([
      { type: "CHANGE_LOGIN_MODAL", payload: true },
      { type: "CHANGE_LOGIN_TYPE", payload: "wx" },
    ]);
  };

  return (
    <>
      <Divider>第三方登录</Divider>
      <ToolLoginBar>
        <svg
          className="qqLogin"
          fill="#50c8fd"
          viewBox="0 0 24 24"
          width="40"
          height="40"
          onClick={qqLogin}
        >
          <path
            d="M12.003 2c-2.265 0-6.29 1.364-6.29 7.325v1.195S3.55 14.96 3.55 17.474c0 .665.17 1.025.281 1.025.114 0 .902-.484 1.748-2.072 0 0-.18 2.197 1.904 3.967 0 0-1.77.495-1.77 1.182 0 .686 4.078.43 6.29 0 2.239.425 6.287.687 6.287 0 0-.688-1.768-1.182-1.768-1.182 2.085-1.77 1.905-3.967 1.905-3.967.845 1.588 1.634 2.072 1.746 2.072.111 0 .283-.36.283-1.025 0-2.514-2.166-6.954-2.166-6.954V9.325C18.29 3.364 14.268 2 12.003 2z"
            fillRule="evenodd"
          ></path>
        </svg>

        <svg
          className="wxLogin"
          fill="#60c84d"
          viewBox="0 0 24 24"
          width="40"
          height="40"
          onClick={wxLogin}
        >
          <path
            d="M2.224 21.667s4.24-1.825 4.788-2.056C15.029 23.141 22 17.714 22 11.898 22 6.984 17.523 3 12 3S2 6.984 2 11.898c0 1.86.64 3.585 1.737 5.013-.274.833-1.513 4.756-1.513 4.756zm5.943-9.707c.69 0 1.25-.569 1.25-1.271a1.26 1.26 0 0 0-1.25-1.271c-.69 0-1.25.569-1.25 1.27 0 .703.56 1.272 1.25 1.272zm7.583 0c.69 0 1.25-.569 1.25-1.271a1.26 1.26 0 0 0-1.25-1.271c-.69 0-1.25.569-1.25 1.27 0 .703.56 1.272 1.25 1.272z"
            fillRule="evenodd"
          ></path>
        </svg>
      </ToolLoginBar>
    </>
  );
}
