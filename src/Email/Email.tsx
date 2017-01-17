import * as React from 'react';
import { Button } from 'react-bootstrap';

import EmailPwd from '../EmailPwd/EmailPwd';

export default class Email extends React.Component<IEmailProps, undefined> {

  constructor() {
    super();
  }

  render() {
    return(
        <tr>
          <td>{this.props.username}</td>
          <td>{this.props.quota}</td>
          <td>
            <EmailPwd emailId={this.props.emailId} username={this.props.username} />
          </td>
        </tr>
    )
  }
}
