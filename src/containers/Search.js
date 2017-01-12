import React from 'react';

import SearchResult from './SearchResult.js';

// Container component to render search, store input value as state and pass as props to SearchResult component
// @todo add debounce func to only process full ein value, not every character
class Search extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
        <div>
          <h3>Search organizations</h3>
          <input type='text' 
            placeholder='Enter an EIN'
            onChange = {this.handleChange} />
          <br />
          <h4>Search result: </h4>
          <SearchResult ein={this.state.value} />
        </div>
    );
  }
}

export default Search;
