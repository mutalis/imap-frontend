import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

class Domain extends Component {

  constructor() {
    super();
    this._handleDelete = this._handleDelete.bind(this);
  }

  render() {
    return(
        <tr>
          <td>{this.props.name}</td>
          <td>{this.props.quota}</td>
          <td>
            <LinkContainer
              to={`/${this.props.name}/${this.props.id}`}><Button>Emails</Button>
            </LinkContainer>
          </td>
          <td><Button bsStyle="danger" onClick={this._handleDelete}>Delete</Button></td>
        </tr>
    );
  }

  _handleDelete() {
    this.props.onDelete(this.props.id)
  }
}

export default Domain;
