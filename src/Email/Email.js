import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Email extends Component {

  _handleDelete() {
    this.props.onDelete(this.props.id)
  }

  render() {
    return(
        <tr>
          <td>{this.props.email}</td>
          <td>{this.props.quota}</td>
          <td><Button bsStyle="danger" onClick={this._handleDelete.bind(this)}>Delete</Button></td>
        </tr>
    )
  }

}

export default Email;
