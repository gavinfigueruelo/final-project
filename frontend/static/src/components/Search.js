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
    this.searchPlants = this.searchPlants.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    this.fetchPlants();
  }

  handleInput(event) {
    this.setState({[event.target.name]: event.target.value}, this.searchPlants);
  }

 async searchPlants() {
   if(this.state.search.trim().length) {
     const response = await fetch(`/api/v1/plants/search/?q=${this.state.search}`);
     const data = await response.json();
     this.setState({ plants: data.data });
   } else {
     this.fetchPlants()
   }
 }

  async fetchPlants() {
    const response = await fetch("/api/v1/plants/");
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
      <div className="col-3 px-2" key={plant.id}>
        <div className="card mb-3">
          <div className="plant-img_container"><img src={plant.image_url} className="card-img-top" alt={plant.common_name}/></div>
          <div className="card-body">
            <h5 className="card-title">{plant.common_name}</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <button type="button" className="btn btn-link" onClick={() => this.addPlant(plant)}>
                Add to profile
              </button>
          </div>
        </div>
      </div>
    ));
    return (
      <>
        <div namespace="home_container">
          <div namespace="search_bar">
          <h2 className="search-title">Search</h2>
            <input type="text" className="searching" name="search" onChange={this.handleInput}/>
          </div>
            <div className="plant_list row px-4">{plants}</div>
        </div>
      </>
    );
  }
}
export default Search;
