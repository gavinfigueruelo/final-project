import React, {Component} from 'react';


class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      serach: '',
      plants: [],
    }

    this.fetchPlants = this.fetchPlants.bind(this);
    this.addPlant = this.addPlant.bind(this);
  }

  componentDidMount() {
    this.fetchPlants();
  }

  async fetchPlants() {
    const response = await fetch('/api/v1/trefle/plants');
    const data = await response.json();
    this.setState({ plants: data.data });
  }

  async addPlant() {
    const response = await fetch('/api/v1/trefle/plants');
    const data = await response.json();
  }


  render() {
    const plants = this.state.plants.map(plant => (
      <li key={plant.id}>
        <p>{plant.common_name}</p>
        <img src={plant.image_url} />
        <button type="button" onClick={this.addPlant}>Add to profile</button>
      </li>
    ));
    return (
      <>
      <input type="text" name="search"/>
      <ul>
        { plants }
      </ul>
      </>
    )
  }
}


export default Search;
