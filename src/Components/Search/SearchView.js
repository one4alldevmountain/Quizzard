import React, { Component } from "react";
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
      <div>
        <HeaderView />
        <center>
          <h3>SEARCH PAGE</h3>
        </center>
        <center>
          <input
            value={title}
            style={{ width: "250px", height: "30px" }}
            placeholder="Search by Title..."
            onChange={event => this.handleChange("title", event.target.value)}
          />
        </center>
        <button onClick={() => this.searchTitle()}>SEARCH</button>
      </div>
      //map over searchResults?
      //{searchResults.map(title=>())}
    );
  }
}

export default SearchView;
