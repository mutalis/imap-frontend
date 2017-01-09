import * as React from 'react';
import { Button } from 'react-bootstrap';

export default class Email extends React.Component<IEmailProps, undefined> {

  _handleDelete() {
//    this.props.onDelete(this.props.id)
  }

  render() {
    return(
        <tr>
          <td>{this.props.username}</td>
          <td>{this.props.quota}</td>
          <td><Button bsStyle="success" onClick={this._handleDelete.bind(this)}>Change password</Button></td>
        </tr>
    )
  }

}
