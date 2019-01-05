import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Grid, Row, Col } from 'react-bootstrap';

const OrgNewsArticles = ({ newses }) => {
  if (!newses || newses.length === 0) return null;

  return (
    <Grid>
      <h4>News</h4>
      <Row
        style={{
          overflowX: 'hidden',
          overflowY: 'scroll',
          maxHeight: '300px',
          display: '-webkit-box',
          display: '-webkit-flex',
          display: '-ms-flexbox',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {newses.map((news, i) => (
          <Col
            xs={12}
            sm={4}
            md={3}
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h5>
              <a href={news.link} rel="nofollow">
                {news.title}
              </a>
            </h5>
            <time>{moment(news.date, 'ddd, DD MMM YYYY HH:mm:ss ZZ').format('MMM D, YYYY')}</time>
            <p className="newsdesc">{news.desc.substring(0, 90).replace(/\w+$/, '…')}</p>
          </Col>
        ))}
      </Row>
    </Grid>
  );
};

OrgNewsArticles.propTypes = {
  newses: PropTypes.array.isRequired,
};

export default OrgNewsArticles;
