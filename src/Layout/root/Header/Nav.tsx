import { Icon, Popover } from "@/components";
import { CaretDownOutlined } from "@ant-design/icons";
import { memo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NavWrapper } from "./styled";
import router from "@/router";
import { classnames } from "hyl-utils";

function NavItem(props: routeItem) {
  const { title, path, icon, children } = props;

  const location = useLocation();

  return (
    <Popover
      content={
        children && (
          <ul>
            {children.map((item) => {
              return (
                <li key={item.title} className="twoNavItem">
                  <NavLink to={`${path}/${item.path}`}>
                    {item.icon && <Icon type={item.icon} />} {item.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )
      }
    >
      <li className="navItem">
        <NavLink
          to={
            children
              ? `${path}/${children.find((item) => item.index)!.path}`
              : path
          }
          className={classnames("navItem-main", {
            active: path === "/" ? false : location.pathname.includes(path),
          })}
        >
          {icon && <Icon type={icon} />}
          <span className="nav-title">{title}</span>
          {children && <CaretDownOutlined className="down" />}
        </NavLink>
      </li>
    </Popover>
  );
}

const Nav = () => (
  <NavWrapper>
    {router
      .filter((item) => item.title)
      .map((item) => (
        <NavItem key={item.title} {...item} />
      ))}
  </NavWrapper>
);

export default memo(Nav);
