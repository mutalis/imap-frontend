import React, { Component } from 'react';
import { Link } from 'react-router';

class Domain extends Component {

  constructor() {
    super();
    this._handleDelete = this._handleDelete.bind(this);
  }

  render() {
    return(
      <div className="domain">
        <ul>
          <li>{this.props.name}</li>
          <li>{this.props.quota}</li>
          <li><Link to={`/${this.props.name}/${this.props.id}`}>Emails</Link></li>
          <li><button id="delete-domain-button" onClick={this._handleDelete}>Delete</button></li>
        </ul>
      </div>
    );
  }

  _handleDelete() {
    this.props.onDelete(this.props.id)
  }
}

export default Domain;
