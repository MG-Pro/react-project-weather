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
              <DropdownInput type="text" id="city" placeholder="Start input city" />
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
