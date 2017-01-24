import * as React from 'react';

import { Alert } from 'react-bootstrap';

export default class AlertDismissable extends React.Component<IAlertDismissableProps, undefined> {

  constructor() {
    super();
  }

  render() {
    if (this.props.message != '') {
      return (
        <Alert bsStyle="success" onDismiss={this.props.hideAlert}>
          <strong>{this.props.message}</strong>
        </Alert>
      )
    }
    return(null);
  }
}
