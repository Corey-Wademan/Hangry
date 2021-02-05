import React from 'react';
import './SearchBar.css';
import '../Business-List/BusinessList'
import {InlineIcon} from '@iconify/react'
import emojiAngry from '@iconify-icons/bi/emoji-angry';
import emojiHappy from '@iconify-icons/heroicons-outline/emoji-happy';




class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match',
      scrolled: false
    };
    
    // refs
    this.searchHeader = React.createRef();
    this.searchFields = React.createRef();
    this.submitSearch = React.createRef();
    // refs-end

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.renderFace = this.renderFace.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.renderScrollNav = this.renderScrollNav.bind(this);

    
    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count'
    };
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active';
    }
    return '';
  }

  handleSortByChange(sortByOption) {
    this.setState({sortBy: sortByOption});
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  handleLocationChange(event) {
    this.setState({location: event.target.value});
  }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (
          <li className={this.getSortByClass(sortByOptionValue)}
            key={sortByOptionValue}
            onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
                {sortByOption}
          </li>);
    });
  } 

  renderFace(){
    return (
    this.props.businesses.length === 0
      ? <h1>Hangry <InlineIcon icon={emojiAngry} /></h1>
      : <h1>Hangry <InlineIcon icon={emojiHappy} /></h1>
    )
  }
  
  handleScroll(){
    let scrollValue = window.scrollY;
    if (scrollValue > 800) {
      this.setState({scrolled: true});
    } else 
        this.setState({scrolled: false})
  }

  renderScrollNav() {
    if (this.state.scrolled) {
      return (
        <div className='scroll-header'>
          <div className="scroll-fields ">
            <input required placeholder="Search Businesses or Food" onChange={this.handleTermChange} />
            <input required placeholder="Where?" onChange={this.handleLocationChange}/>
          </div>
          <div className="scroll-submit">
            <button onClick={this.handleSearch}>
              <span class="iconify" data-icon="iwwa:search" data-inline="false"></span>
            </button>
          </div>
        </div>
      )
    }
  }

  handleSearch(event) {
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    event.preventDefault();
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate(){
    this.renderFace();
  }

  render() {
    return (
      <>
        <div ref={this.searchHeader} className='SearchBar'>
          {!this.state.scrolled && this.renderFace()} 
          <div className="SearchBar-sort-options">
            <ul>
              {this.renderSortByOptions()}
            </ul>
          </div>
          <div ref={this.searchFields} className="SearchBar-fields ">
            <input required placeholder="Search Businesses or Food" onChange={this.handleTermChange} />
            <input required placeholder="Where?" onChange={this.handleLocationChange}/>
          </div>
          <div ref={this.submitSearch} className="SearchBar-submit">
            <button onClick={this.handleSearch}><span class="iconify" data-icon="iwwa:search" data-inline="false"></span></button>
          </div>
        </div>
        { this.props.businesses.length > 0 &&
        <div className="searchQueryDisplay">
          <h3>Displaying <span>{this.state.term}</span> results near <span>{this.state.location}</span></h3> 
          <h5>Sorted by: (
            { this.state.sortBy === 'best_match' && <span>Best Match</span>}
            { this.state.sortBy === 'rating' && <span>Highest Rated</span>}
            { this.state.sortBy === 'review_count' && <span>Most Reviewed</span>}
            )</h5>
        </div>
        }
        {this.renderScrollNav()}
      </>
    );
  };
};

export default SearchBar