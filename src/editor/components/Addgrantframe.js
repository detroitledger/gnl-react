import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { API_HOST } from '../api';
import Instructions from './Instructions';
import { withPdfs } from '../containers/WithPdfs';

import './Addgrantframe.scss';

class Addgrantframe extends Component {
  tourStart = () => this.props.tourStart()

  render() {
    const { haspdfs, isFetching, userpdfId, userpdfs } = this.props;

    if (isFetching && !userpdfs.length) {
      return <p>Loading...</p>;
    }

    if (!haspdfs) {
      return (
        <div>
          <Instructions tourStart={this.tourStart} />
        </div>
      );
    }

    const selectedPdf = userpdfs.find(p => p.id === parseInt(userpdfId, 10));
    const orgNameAndId = `${selectedPdf.org.name} (${selectedPdf.org.id})`;
    const toYear = selectedPdf.year + 1;
    const source = `IRS 990 ${selectedPdf.year} ${selectedPdf.pdfurl}`;

    const iframeSrc = `${API_HOST}/node/add/grant?edit[field_year][und][0][value][date]=01/${selectedPdf.year}&edit[field_year][und][0][value2][date]=01/${toYear}&edit[field_funder][und][0][target_id]=${orgNameAndId}&edit[field_source][und][0][value]=${source}`;

    return (
      <div className="Addgrantframe">
        <iframe title="add grant" src={iframeSrc} />
      </div>
    );
  }
}

Addgrantframe.propTypes = {
  haspdfs: PropTypes.bool,
  userpdfId: PropTypes.string,
  userpdfs: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  tourStart: PropTypes.func.isRequired,
};

const AddgrantframeWrapped = withPdfs(connect(null, actions)(Addgrantframe));

export default AddgrantframeWrapped;
