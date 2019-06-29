import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './Search.scss';
import HeaderView from "../Header/HeaderView";
// import axios from "axios";

class SearchView extends Component {
  constructor() {
    super();

    this.state = {
      searchResults: [],
      title: ""
    };
  }

  handleChange = (property, value) => {
    this.setState({ [property]: value });
  };
  searchTitle = () => {
    // axios.get(`api/${this.state.title}`).then(res =>
    //     this.setState({searchResults: res.data}));
  };
  render() {
    let { searchResults, title } = this.state;
    return (
      <div className="search-page">
        <HeaderView />
        <Link 
        className="back-arrow"
        to="/Home">&#8592;</Link>
        <center>
          <h3 className="search-page-title">Find a Quiz</h3>
        </center>

          <div> 
             <hr />
          </div>
       

        <div className="search-box">
          <input
            className="search-input-box"
            value={title}
            placeholder="Search by Title..."
            onChange={event => this.handleChange("title", event.target.value)}
          />

          <button 
          className="search-btn"
          onClick={() => this.searchTitle()}>Search</button>
        </div>
        
       
      </div>
      //map over searchResults?
      //{searchResults.map(title=>())}
    );
  }
}

export default SearchView;
