import React, { Component } from 'react';
import Email from '../Email/Email';
import EmailForm from '../EmailForm/EmailForm';
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

  _fetchEmails(url) {
    Client.getEntries(url).then((emails) => (
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
    Client.deleteEntry(`/v2/emails/${emailId}`).then(() => {
      const emails = this.state.emails.filter(
        email => email.id !== emailId
      );
      this.setState({ emails });
    });
  }

  _addEmail(email) {
    Client.addEntry(`/v2/domains/${this.props.params.domainId}/emails`, email).then((email) => (
      this.setState({
        emails : this.state.emails.concat([email])
      })
    ));
  }

  render() {
    const emails = this._getEmails();
    return (
      <div className="EmailBox">
        <EmailForm
          domainId={`${this.props.params.domainId}`}
          addEmail={this._addEmail.bind(this)} />
        <div className="email-list">
          {emails}
        </div>
      </div>
    );
  }
}

export default EmailBox;
