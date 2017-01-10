import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

export default function Index() {
  return (
    <Row>
      <Helmet title="Homepage" />
      <Col md={6}>
        <h2>Welcome to my demo app.</h2>
        <h3>Check out these links</h3>
        <ul>
          <li><Link to="/about">About</Link></li>
        </ul>
      </Col>
    </Row>
  );
}
