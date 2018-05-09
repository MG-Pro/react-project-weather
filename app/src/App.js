import React, {Component} from 'react';
import WeatherDisplay from './WeatherDisplay';
import './App.css';

const PLACES = [
  {name: "Palo Alto", zip: "94303"},
  {name: "San Jose", zip: "94088"},
  {name: "Santa Cruz", zip: "95062"},
  {name: "Honolulu", zip: "96803"}
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePlace: 0
    }

  }

  render() {
    return (
      <div>
        {PLACES.map((item, i) => {
          return <button
            key = {i}
            onClick = {() => {
              this.setState({
                activePlace: i
              })
            }}
          >
            {item.name}
            </button>
        })}
        <WeatherDisplay zip = {PLACES[this.state.activePlace].name}/>
      </div>
    );
  }
}

export default App;
