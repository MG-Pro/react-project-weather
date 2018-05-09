import React, {Component} from 'react';
import WeatherDisplay from './WeatherDisplay';
import {Navbar, NavbarBrand, Container, Label, Input, Row, Col} from "reactstrap";
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


  componentWillMount() {
    fetch('http://api.sypexgeo.net/json/').then(res => res.json()).then(json => {
      this.setState({
        coords: {
          lat: json.city.lat,
          lon: json.city.lon
        }
      });
    });
  }

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
              <Input type="text" id="city" placeholder="Start input" />
            </Col>
          </Row>
          <Row>
            <Col sm = {8} md = {{size: 6, offset: null}}>
              <WeatherDisplay coords = {this.state.coords}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
