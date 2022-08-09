import { NavLink } from "react-router-dom";
import { Banner } from "./StyledComponents";
import { Particle } from "jparticles";
import { useMount } from "@/hooks";
import "./style.scss";

interface isBanner {
  title: string;
  autograph?: string;
  twoRouter?: any;
}

function Index({ title = "标题", autograph = "", twoRouter }: isBanner) {
  useMount(() => {
    new Particle("#particle-banner", {
      // 两粒子圆心点之间的直线距离
      proximity: 0,
      // 定位点半径 100 以内（包含）的所有粒子，圆心点之间小于等于 proximity 值，则连线
      range: 150,
      color: "#e2e469",
      eventElem: document.querySelector(".banner") as any,
      num: 0.03,
      lineWidth: 0.4,
      minR: 2,
    });
  });

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
