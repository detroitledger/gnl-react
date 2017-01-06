import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function Search() {
  return (
    <Row>
      <Col md={6}>
      	<h2>Search organizations</h2>
      	<input type="text" placeholder="Search by EIN" />
      </Col>
    </Row>
  );
}