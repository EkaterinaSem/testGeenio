import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from 'modules/button/Button';

import './search.css';

class Search extends Component {

  constructor () {
    super();
    this.state = {
      search_field: null,
    };

    //this.onClick = this.onClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({
      search_field:  event.target.value,
    });
  }

  // onClick () {
  //   const { search_field } = this.state;
  //   const { onSearchClick } = this.props;
  //   onSearchClick(search_field);
  // }

  render() {
    const { search_field } = this.state;
    const { onSearchClick, onCancelClick } = this.props;
    console.log(onSearchClick, onCancelClick)
    return [
      <div key={1} className="search-form">
        <div className={`input-wrapper ${search_field && 'not-empty'}`}>
          <input
            name="search_field"
            maxLength={255}
            onChange={this.onInputChange}
          />
          <div className="placeholder search-field">Кого ищем?</div>
        </div>
      </div>,
      <div key={2} className="button-wrapper">
        <Button
        onClick={onSearchClick(search_field)}
      >Искать
        </Button>
        <Button
          onClick={onCancelClick}
          cls={'text'}
        >Отмена
        </Button>
      </div>
    ];
  }
}

Search.propTypes = {
  onSearchClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
};

export default connect()(Search);