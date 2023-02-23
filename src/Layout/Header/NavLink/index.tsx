import { Icon } from "@/components";
import { useBoolean } from "@/hooks";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Popover, Menu, MenuProps, Dropdown } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

function NavItem(props) {
  const { title, path, search, icon, children } = props;

  const [flag, on, off] = useBoolean(false);

  if (title) {
    if (children) {
      return (
        <NavLink
          key={title}
          to={{
            pathname: path,
            search,
          }}
        >
          <Popover
            getPopupContainer={(node: HTMLElement) => node}
            content={
              <ul className="twoNav">
                {children.map((item) => {
                  return (
                    <NavLink to={`${path}/${item.path}`}>
                      <li>
                        <Icon type={item.icon} /> {item.title}
                      </li>
                    </NavLink>
                  );
                })}
              </ul>
            }
          >
            <li onMouseOver={on} onMouseLeave={off}>
              <Icon type={icon} /> {title}
              {flag ? <CaretUpOutlined /> : <CaretDownOutlined />}
            </li>
          </Popover>
        </NavLink>
      );
    }

    return (
      <NavLink
        key={title}
        to={{
          pathname: path,
          search,
        }}
      >
        <li onMouseOver={on} onMouseLeave={off}>
          <Icon type={icon} /> {title}
        </li>
      </NavLink>
    );
  }
  return null;
}

export default NavItem;
