import React, { Component } from "react";
import Cookies from "js-cookie";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serach: "",
      plants: [],
    };

    this.fetchPlants = this.fetchPlants.bind(this);
    this.addPlant = this.addPlant.bind(this);
  }

  componentDidMount() {
    this.fetchPlants();
  }

  async fetchPlants() {
    const response = await fetch("/api/v1/trefle/plants/");
    const data = await response.json();
    console.log("search", data);
    this.setState({ plants: data.data });
  }

  async addPlant(plant) {
    const obj = {
      common_name: plant.common_name,
      family: plant.family,
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
      <li key={plant.id}>
        <p>{plant.common_name}</p>
        <img src={plant.image_url} />
        <button type="button" onClick={() => this.addPlant(plant)}>
          Add to profile
        </button>
      </li>
    ));
    return (
      <>
        <div namespace="home_container">
          <div namespace="search_bar">
          <h2>Search</h2>
            <input type="text" className="searching" />
          </div>
            <ul class="plant_list">{plants}</ul>
        </div>
      </>
    );
  }
}

export default Search;
