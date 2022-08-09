import { OverPack } from "rc-scroll-anim";
import "./style.scss";

const footerData = [
  {
    title: "相关链接",
    children: [
      { title: "博文", link: "/article" },
      { title: "资源", link: "/resource" },
      { title: "归档", link: "/journal/file" },
    ],
  },
  {
    title: "关于",
    children: [
      { title: "留言", link: "/message" },
      { title: "日记", link: "/journal" },
    ],
  },
  {
    title: "联系我",
    children: [
      { title: "地址：北京市海淀区" },
      { title: "Q Q：3307578337" },
      { title: "微信：17803000829" },
      { title: "邮箱：17803000829@163.com" },
    ],
  },
];

export default function Footer() {
  return (
    <div className="homeFooter">
      <OverPack playScale={0}>
        <div className="homeFooter-content">
          <div className="homeFooter-content-block animate__animated  animate__fadeInUp">
            <img src={require("@/assets/img/logo-white.png")} alt="" />
            <p className="homeFooter-content-autograph">
              不要否认你的本能，召唤师
            </p>
          </div>
          {footerData.map(({ title, children }) => {
            return (
              <div
                className="homeFooter-content-block animate__animated  animate__fadeInUp"
                key={title}
              >
                <h2>{title}</h2>
                {children.map((v: any) => {
                  return (
                    <p className="v" key={v.title}>
                      <a href={v.link || null}>{v.title}</a>
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
      </OverPack>
    </div>
  );
}
