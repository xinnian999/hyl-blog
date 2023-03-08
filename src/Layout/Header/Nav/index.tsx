import { Icon } from "@/components";
import { router } from "@/config";
import { CaretDownOutlined } from "@ant-design/icons";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

function NavItem(props: routeItem) {
  const { title, path, icon, children } = props;

  return (
    <div className="navItem">
      <NavLink
        to={
          children
            ? `${path}/${children.find((item) => item.index)!.path}`
            : path
        }
      >
        <li>
          {icon && <Icon type={icon} />}
          <span className="nav-title">{title}</span>
          {children && <CaretDownOutlined className="down" />}
        </li>
      </NavLink>
      {children && (
        <ul className="twoNav">
          {children.map((item) => {
            return (
              <NavLink key={item.title} to={`${path}/${item.path}`}>
                <li className="twoNavLi">
                  {icon && <Icon type={icon} />}
                  {item.title}
                </li>
              </NavLink>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const Nav = () => (
  <ul id="nav">
    {router
      .filter((item) => item.title)
      .map((item: any) => (
        <NavItem key={item.title} {...item} />
      ))}
  </ul>
);

export default memo(Nav);
