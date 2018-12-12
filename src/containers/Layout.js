import React from 'react';
import { Link } from 'react-router';

import NavbarLink from '../components/NavbarLink';
import Footer from '../components/Footer';

const Layout = ({ children, /* params, */ location }) => (
  <div>
    <nav className="navbar navbar-inverse">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            The Detroit Ledger
          </Link>
        </div>

        <ul className="nav navbar-nav">
          <NavbarLink title="About" href="/about" active={location.pathname === '/about'} />
          <NavbarLink
            title="An organization"
            href="/organizations/111"
            active={location.pathname.indexOf('organizations/') !== -1}
          />
          <NavbarLink title="Search" href="/search" active={location.pathname === '/search'} />
        </ul>
      </div>
    </nav>
    <div className="container">{children}</div>
    <Footer />
  </div>
);

export default Layout;
