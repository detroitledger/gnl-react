import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavbarLink = ({ title, href, active = false }) => (
  <li className={active ? 'active' : undefined}>
    <Link to={href}>
      {title}
      {active && (
        <span className="sr-only">
          (current)
        </span>
      )}
    </Link>
  </li>
);

NavbarLink.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  active: PropTypes.bool,
};

export default NavbarLink;
