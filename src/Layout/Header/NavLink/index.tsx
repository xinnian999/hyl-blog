import { Icon } from "@/components";
import { CaretDownOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import "./style.scss";

function NavItem(props) {
  const { title, path, search, icon, children } = props;

  return (
    <div className="navItem">
      <NavLink
        to={{
          pathname: path,
          search,
        }}
      >
        <li>
          <Icon type={icon} />
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
                  <Icon type={item.icon} /> {item.title}
                </li>
              </NavLink>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default NavItem;
