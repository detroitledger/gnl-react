import React, { PropTypes } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

const Page = ({ children }) => (
  <Grid>
    <Row>
      <Col md={12}>{children}</Col>
    </Row>
  </Grid>
);
export default Page;
