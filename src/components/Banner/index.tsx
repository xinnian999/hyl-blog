import { useNavigate, useLocation } from "react-router-dom";
import { Radio } from "antd";
import { Banner } from "./StyledComponents";
import "./style.scss";

interface isBanner {
  title: string;
  autograph?: string;
  twoRouter?: any;
}

function Index({ title = "标题", autograph = "", twoRouter }: isBanner) {
  const navigate = useNavigate();
  const location = useLocation();

  const pathnameArr = location.pathname.split("/");
  const defaultValue =
    pathnameArr.length > 2
      ? pathnameArr.at(-1)
      : twoRouter?.find((item) => item.index).path;

  return (
    <div className="banner-container">
      <Banner></Banner>
      <div id="banner">
        <article>
          <h2>{title}</h2>
          <p>{autograph} </p>
        </article>

        {twoRouter && (
          <div className="banner-nav">
            <Radio.Group
              value={defaultValue}
              buttonStyle="solid"
              style={{ marginTop: 16 }}
              className="banner-nav-button"
            >
              {twoRouter.map(({ path, title }: any, i: any) => {
                return (
                  <Radio.Button
                    value={path}
                    onClick={() => navigate(path)}
                    key={path}
                  >
                    {title}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
