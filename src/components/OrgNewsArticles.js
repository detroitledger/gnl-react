import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import shave from 'shave';
import { Grid, Row, Col } from 'react-bootstrap';

export default class OrgNewsArticles extends Component {

  componentDidUpdate(prevProps, prevState) {
    shave('.newsdesc', 70);
  }

  render() {
    return (
      <Grid>
        <h4>News</h4>
        <Row style={{
          overflowX: 'hidden',
          overflowY: 'scroll',
          height: '300px',
          display: '-webkit-box',
          display: '-webkit-flex',
          display: '-ms-flexbox',
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          {this.props.newses.map((news, i) => (
            <Col xs={12} sm={4} md={3} key={i} style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              <h5><a href={news.link} rel="nofollow">{news.title}</a></h5>
              <time>{moment(news.date, 'ddd, DD MMM YYYY HH:mm:ss ZZ').format('MMM D, YYYY')}</time>
              <p className='newsdesc'>{news.desc}</p>
            </Col>
          ))}
        </Row>
      </Grid>
    );
  }

}

OrgNewsArticles.propTypes = {
  newses: PropTypes.array.isRequired,
};
