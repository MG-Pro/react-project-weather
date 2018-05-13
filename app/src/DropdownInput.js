import React, {Component} from 'react';
import shortid from 'shortid';
import PropTypes from 'proptypes';

class DropdownInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      show: ''
    }
  }

  choiceCity = (e) => {
    const val = e.currentTarget.value;
    if (val.length >= 3) {

      fetch(`https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token 48749cf8e4cb2fd2cd50a24b9fb4991cc33a0194'
        },
        body: JSON.stringify({
          query: val,
          count: 10,
          to_bound: {value: "city"},
          from_bound: {value: "city"},
          locations: [{city_type_full: "город"}]
        })
      })
        .then(res => res.json()).then(json => {
        this.setState({
          cities: json.suggestions,
          show: 'show'
        })
      });
    }
  };

  static get propTypes() {
    return {
      placeholder: PropTypes.string.isRequired,
      onSelectCity: PropTypes.func.isRequired
    }
  }

  static get defaultProps() {
    return {
      placeholder: 'Start input city'
    }
  }

  menuHandler = (e) => {
    this.input.value = e.target.textContent;
    this.setState({
      show: ''
    });
    this.props.onSelectCity(this.state.cities[e.target.id])
  };

  render() {
    return (
      <div className = "input-append dropdown">
        <input className = "form-control" type = "text" ref = {(elem) => this.input = elem}
          placeholder = {this.props.placeholder} onChange = {this.choiceCity}/>
        <ul className = {`dropdown-menu ${this.state.show}`} onClick = {this.menuHandler}>
          {
            this.state.cities.map((item, i) => {
              return <li id = {i} className = 'dropdown-item' key = {shortid.generate()}>{item.data.city}</li>
            })}
        </ul>
      </div>
    );
  }
}

export default DropdownInput;

