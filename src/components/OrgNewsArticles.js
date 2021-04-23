import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Row, Col } from 'react-bootstrap';

const OrgNewsArticles = ({ newses, limit }) => {
  if (!newses || newses.length === 0) return null;

  return (
    <div className="news">
      <h2>News</h2>
      <Row
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {newses.slice(0, limit).map((news) => (
          <Col
            xs={12}
            sm={4}
            md={3}
            key={news.uuid}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h4>
              <a href={news.link} rel="nofollow">
                {news.title}
              </a>
            </h4>
            <time>{moment(news.date).format('MMM D, YYYY')}</time>
            <p className="newsdesc">
              {news.description.substring(0, 90).replace(/\w+$/, '…')}
            </p>
          </Col>
        ))}
      </Row>
    </div>
  );
};

OrgNewsArticles.propTypes = {
  newses: PropTypes.array.isRequired,
};

export default OrgNewsArticles;
