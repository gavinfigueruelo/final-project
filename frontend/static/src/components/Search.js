import React, { Component } from "react";
import Cookies from "js-cookie";
import { withRouter} from "react-router";
import * as QueryString from "query-string";
import {NavLink} from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serach: "",
      plants: [],
      page: "1",
    };
    this.fetchPlants = this.fetchPlants.bind(this);
    this.addPlant = this.addPlant.bind(this);
    this.searchPlants = this.searchPlants.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    this.fetchPlants();
  }

  componentDidUpdate(prevProps) {
    if(this.props.location.search !== prevProps.location.search) {
      if(this.props.location.search.length) {
        const params = QueryString.parse(this.props.location.search);
        const page = params.page
        this.setState({page}, this.fetchPlants);
      } else {
        this.setState({page: "1"}, this.fetchPlants);
      }
    }
  }

  handleInput(event) {
    this.setState(
      { [event.target.name]: event.target.value },
      this.searchPlants
    );
  }

  async searchPlants() {
    if (this.state.search.trim().length) {
      const response = await fetch(
        `/api/v1/plants/search/?q=${this.state.search}`
      );

      if (response.status === 200) {
        const json = await response.json();
        this.setState({ plants: json.data});
      } else {
         this.fetchPlants();
      }
    }
    //   const data = await response.json();
    //   this.setState({ plants: data });
    // } else {
    //   this.fetchPlants();
    // }
  }

  async fetchPlants() {
    const response = await fetch(`/api/v1/plants/?page=${this.state.page}`);
    const json = await response.json();
    this.setState({ plants:  json.data});
  }

  async handleNext() {
    // Return if there is no next page
    const plants = this.state.plants
    if (!plants.links.next) return

    // Get next page number
    const nextLink = this.state.plants.links.next;
    const page = nextLink.split('?')[1]

    // Make fetch call to api for page with query to plant end point
    const response = await fetch(`/api/v1/plants?q=${page}`);
    const data = await response.json();
    console.log("search", data);
    this.setState({ plants: data });
  }

  async handlePrev() {
    // Return if there is no prev page
    const plants = this.state.plants
    if (!plants.links.prev) return

    // Get next page number
    const nextLink = this.state.plants.links.prev;
    const page = nextLink.split('?')[1]

    // Make fetch call to api for page with query to plant end point
    const response = await fetch(`/api/v1/plants?q=${page}`);
    const data = await response.json();
    console.log("search", data);
    this.setState({ plants: data });

  }

  async addPlant(plant) {
    const obj = {
      common_name: plant.common_name,
      family: plant.family_common_name,
      image_url: plant.image_url,
      publication_year: plant.year,
      api_id: plant.id,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(obj),
    };
    const response = await fetch("/api/v1/user/plants/add/", options);
    console.log(response);
  }

  render() {
    const plants = this.state.plants.map((plant) => (
      <div className="card" key={plant.id}>
        <div className="plant-img_container">
          <img
            src={plant.image_url}
            className="card-img-top"
            alt={plant.common_name}
            onError={e => e.target.style.display='none'}
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{plant.common_name}</h5>
          <p className="card-text">
            {plant.family_common_name}
          </p>
          {this.props.isLoggedIn && (
            <button type="button" className="btn btn-link ml-auto" onClick={() => this.addPlant(plant)}>
              Add to profile
            </button>
          )}
        </div>
      </div>
    ));
    return (
      <>
        <div className="p-4">
          <div className="search_bar row d-flex mb-4 position-relative">
            {/*<h2 className="search-title">Search</h2>*/}
            <input
              type="text"
              className="searching form-control mr-sm-2 ml-3 position-absolute"
              name="search"
              value= {this.state.search}
              onChange={this.handleInput}
              placeholder="Search"
            />

            <div className="d-flex ml-auto pag-btns">
              <NavLink className={`nav-link ${this.state.page === "1" ? "disabled": "display"}`} to={`/?page=${Number(this.state.page) - 1}`}>Prev</NavLink>
              <NavLink className={`nav-link ${this.state.page === "18879" ? "disabled": "display"}`} to={`/?page=${Number(this.state.page) + 1}`}>Next</NavLink>
            </div>
          </div>
          <div className="card-columns plant-col">{plants}</div>
          {/* <button className="prev-btn btn btn-light" onClick={() => this.handlePrev()}>Prev</button>
           <button className="next-btn btn btn-light" onClick={() => this.handleNext()}>Next</button> */}
        </div>
      </>
    );
  }
}
export default withRouter(Search);
