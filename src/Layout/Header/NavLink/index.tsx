import { Icon } from "@/components";
import { CaretDownOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import "./style.scss";

function NavItem(props) {
  const { title, path, search, icon, children } = props;

  if (title) {
    return (
      <NavLink
        key={title}
        to={{
          pathname: path,
          search,
        }}
      >
        <li>
          <Icon type={icon} />
          <span className="nav-title">{title}</span>
          {children && <CaretDownOutlined className="down" />}
          {children && (
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
          )}
        </li>
      </NavLink>
    );
  }
  return null;
}

export default NavItem;
