import React, { Component } from 'react';
// import Client from '../Client';

class Domain extends Component {

  constructor() {
    super();
    this._handleDelete = this._handleDelete.bind(this);
  }

  render() {
    return(
      <div className="domain">
        <p>{this.props.name}</p>
        <p>{this.props.quota}</p>
        <button id="delete-domain-button" onClick={this._handleDelete}>Delete</button>
        <button id="delete-domain-button" onClick={this._handleDelete}>Emails</button>
        <hr></hr>
      </div>
    );
  }

  _handleDelete() {
    this.props.onDelete(this.props.id)
  }
}

export default Domain;
