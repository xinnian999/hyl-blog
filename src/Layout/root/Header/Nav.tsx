import { Icon, Popover } from '@/components';
import router from '@/router';
import { CaretDownOutlined } from '@ant-design/icons';
import { classnames } from 'hyl-utils';
import { memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavWrapper = styled.ul`
  display: inline-flex;
  /* margin-left: auto; */

  .navItem {
    position: relative;
    margin-right: 10px;
    /* ${({ theme }) =>
      theme.scrollTop < 1 && 'text-shadow: 0px 0px 10px black;'}; */

    a {
      color: ${({ theme }) => (theme.scrollTop > 1 ? '#555' : '#fff')};
    }
    &-main {
      padding: 5px;
      border-radius: 10px;
      position: relative;
      font-size: 15px;
      font-weight: bold;
      text-align: center;

      .nav-title {
        padding: 0 5px;
      }

      .down {
        display: inline-block;
        transition: 0.5s transform;
      }
    }

    &:hover .down {
      transform: rotate(180deg);
    }
    &:hover a {
      color: var(--ant-primary-4);
    }
  }
  .towNav {
    /* text-align: center; */
    white-space: nowrap;
    .twoNavItem {
      font-weight: bold;
      a {
        display: block;
        color: #555;
        transition: 0.5s all;

        &:hover {
          color: var(--ant-primary-color);
          transform: translateX(5px);
        }
      }
    }

    .active {
      color: var(--ant-primary-color) !important;
      background-color: transparent;
    }
  }
`;

function NavItem(props: routeItem) {
  const { title, path, icon, children } = props;

  const location = useLocation();

  return (
    <Popover
      content={
        children && (
          <>
            <header>{title}</header>
            <ul className='towNav'>
              {children.map(item => {
                return (
                  <li key={item.title} className='twoNavItem'>
                    <NavLink to={`${path}/${item.path}`}>
                      {item.icon && <Icon type={item.icon} />} {item.title}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </>
        )
      }
    >
      <li className='navItem'>
        <NavLink
          to={
            children
              ? `${path}/${children.find(item => item.index)!.path}`
              : path
          }
          className={classnames('navItem-main', {
            active: path === '/' ? false : location.pathname.includes(path),
          })}
        >
          {icon && <Icon type={icon} />}
          <span className='nav-title'>{title}</span>
          {children && <CaretDownOutlined className='down' />}
        </NavLink>
      </li>
    </Popover>
  );
}

const Nav = () => (
  <NavWrapper>
    {router
      .filter(item => item.title)
      .map(item => (
        <NavItem key={item.title} {...item} />
      ))}
  </NavWrapper>
);

export default memo(Nav);
