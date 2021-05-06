import React from 'react';
import { connect } from 'react-redux';

import NavbarLink from '../components/NavbarLink';

const AdminLinks = ({ user }) =>
  user ? (
    <>
      <NavbarLink title="Add grant" href="/admin/grants/add" />
      <NavbarLink title="Manage PDFs" href="/admin/pdfs" />
      <NavbarLink title="Account" href="/admin" />
    </>
  ) : (
    <>
      <NavbarLink title="Log in" href="/admin" />
    </>
  );

export default connect(({ auth }) => ({
  user: auth.user,
}))(AdminLinks);
