import React, { PropTypes } from 'react';
import moment from 'moment';
import { Row, Col } from 'react-bootstrap';

const OrgNewsArticles = ({ newses }) => (
  <div id="news">
    <h2>News</h2>
    <Row
      style={{
        overflowX: 'hidden',
        overflowY: 'scroll',
        height: '300px',
        display: '-webkit-box',
        display: '-webkit-flex',
        display: '-ms-flexbox',
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {newses.map((news, i) => (
        <Col xs={12} sm={4} md={3} key={i}>
          <div className="article">
            <h3>
              <a href={news.link} rel="nofollow">
                {news.title}
              </a>
            </h3>
            <time>{moment(news.date, 'ddd, DD MMM YYYY HH:mm:ss ZZ').format('MMM D, YYYY')}</time>
            <p>{news.desc.substring(0, 90).replace(/\w+$/, '…')}</p>
          </div>
        </Col>
      ))}
    </Row>
  </div>
);

OrgNewsArticles.propTypes = {
  newses: PropTypes.array.isRequired,
};

export default OrgNewsArticles;
