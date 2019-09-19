import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PDF from 'react-pdf-js';

import './Pdfviewer.scss';

class Pdfviewer extends Component {
  state = {};

  onDocumentComplete = (pages) => {
    this.setState({
      scale: 1,
      rotate: 0,
      page: this.props.currentpg,
      pages,
    });
  };

  onPageComplete = (page) => {
    this.setState({ page });
  };

  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
    this.props.onPagechange(this.state.page - 1);
  };

  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
    this.props.onPagechange(this.state.page + 1);
  };

  handleFirst = () => {
    this.setState({ page: 1 });
  };

  handleLast = () => {
    this.setState({ page: this.state.pages });
  };

  handleZoomIn = () => {
    this.setState({ scale: this.state.scale + 0.25 });
  };

  handleZoomOut = () => {
    this.setState({ scale: this.state.scale - 0.25 });
  };

  handleRotateCcw = () => {
    // changing rotate to 0 does not trigger rerender, see bug
    // https://github.com/mikecousins/react-pdf-js/issues/36
    this.setState({ rotate: ((this.state.rotate - 90) % 360) + 360 });
  };

  handleRotateCw = () => {
    this.setState({ rotate: ((this.state.rotate + 90) % 360) + 360 });
  };

  renderPagination = (page, pages) => {
    const firstButton = (
      <button className="first" onClick={this.handleFirst}>
        &laquo;
      </button>
    );
    const lastButton = (
      <button className="last" onClick={this.handleLast}>
        &raquo;
      </button>
    );

    let previousButton = (
      <button className="previous" onClick={this.handlePrevious}>
        &lt;
      </button>
    );
    if (page === 1) {
      previousButton = (
        <button disabled className="previous disabled">
          &lt;
        </button>
      );
    }
    let nextButton = (
      <button className="next" onClick={this.handleNext}>
        &gt;
      </button>
    );
    if (page === pages) {
      nextButton = (
        <button disabled className="next disabled">
          &gt;
        </button>
      );
    }

    return (
      <span className="Pdfviewer-pager">
        {firstButton}
        {previousButton}
        {nextButton}
        {lastButton}
      </span>
    );
  };

  renderZoomer = () => {
    return (
      <span className="Pdfviewer-zoomer">
        <button onClick={this.handleZoomOut}>-</button>
        <button onClick={this.handleZoomIn}>+</button>
        <button onClick={this.handleRotateCcw}>↶ </button>
        <button onClick={this.handleRotateCw}>↷ </button>
      </span>
    );
  };

  /**
   * Give a different url if we're using the cra server.
   */
  getPdfurl = () => {
    if (window.location.host === '127.0.0.1:3000') {
      return this.props.pdfUrl.replace('8888/sites/default/files', '3000');
    }

    return this.props.pdfUrl;
  };

  render() {
    if (!this.props.pdfUrl) {
      return <div>Loading...</div>;
    }

    let pagination = null;

    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }

    const zoomer = this.renderZoomer();

    const pdfurl = this.getPdfurl();

    return (
      <div className="Pdfviewer">
        <PDF
          file={pdfurl}
          onDocumentComplete={this.onDocumentComplete}
          onPageComplete={this.onPageComplete}
          page={this.state.page}
          scale={this.state.scale}
          rotate={this.state.rotate}
        />
        <nav className="Pdfviewer-controls">
          {pagination}
          {zoomer}
        </nav>
      </div>
    );
  }
}

Pdfviewer.propTypes = {
  pdfUrl: PropTypes.string,
  currentpg: PropTypes.number,
  onPagechange: PropTypes.func.isRequired,
};

export default Pdfviewer;
