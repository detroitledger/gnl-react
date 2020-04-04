import React from 'react';

import SearchResult from './SearchResult.js';

// Container component to render search and store input value as state
class Search extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  // @todo add debounce func
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <input
          style={{ width: '100%' }}
          type="text"
          placeholder="Find an organization or funder you care about"
          onChange={this.handleChange}
        />
        {this.state.value && <SearchResult name={this.state.value} />}
      </div>
    );
  }
}

export default Search;
