import React, {Component} from 'react';

class DropdownInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: []
    }

  }

  choiceCity = (e) => {
    const val = e.currentTarget.value;
    console.log(val);
    if (val.length >= 3) {

      let body = JSON.stringify({
        query: val,
        count: 10,
        to_bound: {value:"city"},
        from_bound: {value:"city"},
        locations:[{city_type_full:"город"}],
      });
      console.log(body);
      fetch(`https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token 48749cf8e4cb2fd2cd50a24b9fb4991cc33a0194'

        },
        mode: 'cors',
        cache: 'default',
        body: body
      })
        .then(res => res.json())
        .then(json => {
          console.log(json);
          let a = Object.keys(json);
          this.setState({
            cities: a
          })
        });
    }
  };

  render() {
    return (
      <div className = "input-append dropdown">
        <input className = "form-control" id = "appendedInputButton" type = "text"
          placeholder = {this.props.placeholder} onChange = {this.choiceCity}/>
        <ul className = "dropdown-menu">
          {this.state.cities.map((item) => {
            console.log(item);
            return <li>{item.name}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default DropdownInput;

