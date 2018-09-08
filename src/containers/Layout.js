import React from 'react';
import { Link } from 'react-router';

import NavbarLink from '../components/NavbarLink';
import Profile from '../components/Profile';
import Errors from '../containers/Errors';

const Layout = ({ children, /* params, */ location }) => (
  <div>
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            The Detroit Ledger
          </Link>
        </div>

        <ul className="nav navbar-nav">
          <NavbarLink
            title="About the Ledger"
            href="/about"
            active={location.pathname === '/about-detroit-ledger'}
          />
          <NavbarLink
            title="Data & Methods"
            href="/our-methods"
            active={location.pathname === '/our-methods'}
          />
          <NavbarLink
            title="Transparency"
            href="/transparency"
            active={location.pathname === '/transparency'}
          />

          <NavbarLink
            title="Organizations"
            href="/organizations"
            active={location.pathname === '/organizations'}
          />
          <NavbarLink
            title="An organization"
            href="/organizations/111"
            active={location.pathname.indexOf('organizations/') !== -1}
          />
          <NavbarLink title="Search" href="/search" active={location.pathname === '/search'} />
        </ul>

        <Profile />
      </div>
    </nav>
    <Errors />
    {children}
  </div>
);

export default Layout;
