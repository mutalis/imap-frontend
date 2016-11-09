import React, { Component } from 'react';

class Email extends Component {

  constructor() {
    super();
    this._handleDelete = this._handleDelete.bind(this);
  }

  render() {
    return(
      <div className="email">
        <ul>
          <li>{this.props.email}</li>
          <li>{this.props.quota}</li>
          <li><button id="delete-email-button" onClick={this._handleDelete}>Delete</button></li>
        </ul>
      </div>
    )
  }

  _handleDelete() {
    this.props.onDelete(this.props.id)
  }
}

export default Email;
