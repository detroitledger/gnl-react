import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Helmet from 'react-helmet';

export default function About() {
  return (
    <Row>
      <Helmet title="About" />
      <Col md={6}>
        <h2>About</h2>
        <p>
          About page.
        </p>
      </Col>
    </Row>
  );
}
