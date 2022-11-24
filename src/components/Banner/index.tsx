import { NavLink } from "react-router-dom";
import { Banner } from "./StyledComponents";
import "./style.scss";

interface isBanner {
  title: string;
  autograph?: string;
  twoRouter?: any;
}

function Index({ title = "标题", autograph = "", twoRouter }: isBanner) {
  return (
    <div className="banner-container">
      <Banner className="banner">
        <div id="particle-banner"></div>
        <article>
          <h2>{title}</h2>
          <p>{autograph} </p>
          {twoRouter && (
            <ul id="nav">
              {twoRouter.map(({ path, title, index }: any, i: any) => {
                return (
                  <NavLink key={title} to={index ? "" : path} end>
                    <li className={i === twoRouter.length - 1 ? "" : "navItem"}>
                      {title}
                    </li>
                  </NavLink>
                );
              })}
            </ul>
          )}
        </article>
      </Banner>
    </div>
  );
}

export default Index;
