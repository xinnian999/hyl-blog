import { Icon } from "@/components";
import { CaretDownOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import "./style.scss";

function NavItem(props) {
  const { title, path, search, icon, children } = props;

  if (title) {
    if (children) {
      return (
        <NavLink
          key={title}
          className="navLink"
          to={{
            pathname: path,
            search,
          }}
        >
          <li>
            <Icon type={icon} /> {title}
            <CaretDownOutlined className="down" />
            <ul className="twoNav">
              {children.map((item) => {
                return (
                  <NavLink to={`${path}/${item.path}`}>
                    <li className="twoNavLi">
                      <Icon type={item.icon} /> {item.title}
                    </li>
                  </NavLink>
                );
              })}
            </ul>
          </li>
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
        <li>
          <Icon type={icon} /> {title}
        </li>
      </NavLink>
    );
  }
  return null;
}

export default NavItem;
