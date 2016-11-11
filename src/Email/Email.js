import React, { Component } from 'react';

class Email extends Component {

  _handleDelete() {
    this.props.onDelete(this.props.id)
  }

  render() {
    return(
      <div className="email">
        <ul>
          <li>{this.props.email}</li>
          <li>{this.props.quota}</li>
          <li><button id="delete-email-button" onClick={this._handleDelete.bind(this)}>Delete</button></li>
        </ul>
      </div>
    )
  }

}

export default Email;
