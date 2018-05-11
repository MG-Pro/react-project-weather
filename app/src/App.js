import React, {Component} from 'react';
import WeatherDisplay from './WeatherDisplay';
import DropdownInput from './DropdownInput'
import {Navbar, NavbarBrand, Container, Label, Row, Col} from "reactstrap";
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: {
        lat: 0,
        lon: 0
      }
    }
  }

  componentDidMount() {
    fetch('http://api.sypexgeo.net/json/').then(res => res.json()).then(json => {
      this.setState({
        coords: {
          lat: json.city.lat,
          lon: json.city.lon
        }
      });
    })
  }

  getCity = (city) => {
    fetch(`https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 48749cf8e4cb2fd2cd50a24b9fb4991cc33a0194'
      },
      body: JSON.stringify({
        query: city.unrestricted_value,
        count: 1,
      })
    })
      .then(res => res.json()).then(json => {
        console.log(json);
      this.setState({
        coords: {
          lat: json.suggestions[0].data.geo_lat,
          lon: json.suggestions[0].data.geo_lon
        }
      });
    })
  };

  render() {
    return (
      <div>
        <Navbar dark color = {'primary'}>
          <Container>
            <NavbarBrand href = "/">
              React Simple Weather App
            </NavbarBrand>
          </Container>
        </Navbar>
        <Container>
          <Row>
            <Col className='mt-3 mb-3'>
              <Label for="city">City</Label>
              <DropdownInput onSelectCity={this.getCity}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <WeatherDisplay coords = {this.state.coords}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
