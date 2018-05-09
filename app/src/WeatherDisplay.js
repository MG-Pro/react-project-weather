import React, {Component} from 'react';

class WeatherDisplay extends Component {
  render() {
    return (
      <div>
        <h1>Displaying weather for city {this.props.zip}</h1>
      </div>
    )
  }
}
export default WeatherDisplay;
