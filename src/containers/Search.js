import React from 'react';

import SearchResult from './SearchResult.js';

// Container component to render search and store input value as state
class Search extends React.Component {
  
  constructor(...args) {
    super(...args);

    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  // @todo add debounce func to only process full ein value, not every character
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
        <div>
          <h2>Find IRS Data</h2>
          <input type='text' 
            placeholder='Search by EIN'
            onChange = {this.handleChange} />
          <br />
          <h3>Finances</h3>
          <SearchResult ein={this.state.value} />
        </div>
    );
  }

}

export default Search;
