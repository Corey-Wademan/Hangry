import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import BusinessList from '../Business-List/BusinessList';
import axios from 'axios';
import Yelp from '../../util/Yelp';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      businesses: []
    };
  } 

  searchYelp(term, location, sortBy) {
    Yelp.search(term, location, sortBy).then(businesses => {
      this.setState({businesses: businesses});
    });
  }

  render() {
    return (
      <div className="App">
        <SearchBar 
          businesses={this.state.businesses} 
          searchYelp={this.searchYelp.bind(this)} />
        <BusinessList 
          businesses={this.state.businesses}/>
      </div>
    );
  }
}

export default App;