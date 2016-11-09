import React, { Component } from 'react';
import Email from '../Email/Email';
import Client from '../Client';

class EmailBox extends Component {

  constructor() {
    super();

    this.state = {
      emails: []
    };
  }

  componentWillMount() {
    this._fetchEmails(`/v2/domains/${this.props.params.domainId}/emails`);
    // console.log(this.props.params.domainName)
    // console.log(this.props.location.pathname)
    // console.log(this.props)
  }

  render() {
    const emails = this._getEmails();
    return (
      <div className="EmailBox">
        <div className="email-list">
          {emails}
        </div>
      </div>
    );
  }

  _fetchEmails(url) {
    Client.search(url).then((emails) => (
        this.setState({
          emails : emails
        })
    ));
  }

  _getEmails() {
    return this.state.emails.map((email) => {
      return <Email
               key={email.id}
               id={email.id}
               email={`${email.username}@${this.props.params.domainName}`}
               quota={email.quota}
               onDelete={this._deleteEmail.bind(this)} />
    });
  }

  _deleteEmail(emailId) {
    const emails = this.state.emails.filter(
      email => email.id !== emailId
    );
    // console.log(emailId);
    this.setState({ emails });
  }
}

export default EmailBox;
