import React from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from 'react-bootstrap';

const Page = ({ children }) => (
  <Grid>
    <Row>
      <Col md={12}>{children}</Col>
    </Row>
  </Grid>
);
export default Page;
