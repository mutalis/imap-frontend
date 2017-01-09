import * as React from 'react';

import Email from '../Email/Email';

import EmailForm from '../EmailForm/EmailForm';

import Client from '../Client';

import { Navbar, Nav, NavItem, Table } from 'react-bootstrap';

export class EmailBox extends React.Component<IEmailBoxProps, IEmailBoxState> {

  constructor() {
    super();

    this.state = {
      emails: [{key: '1', username: 'user1', quota: '11'}, {key: '2', username: 'user2', quota: '22'}]
    };

  }

  componentWillMount() {
    //this.fetchEmails(`/v2/domains/${this.props.domainId}/emails`);
    this.fetchEmails('http://api.example.com:3000/v2/domains/0af0f599-307b-4b28-9d7b-6ca9cfc4e821/emails');
    console.log(this.props)
  }

  fetchEmails(url:string) {
    Client.getEntries(url).then((emails:any) => {
      this.setState({
        emails : emails
      })
    });
  }

  getEmails() {
    return this.state.emails.map((email) => {
      return <Email
               key={email.key}
               username={email.username}
               quota={email.quota}
             />
    });
  }
/*
  _deleteEmail(emailId) {
    Client.deleteEntry(`/v2/emails/${emailId}`).then(() => {
      const emails = this.state.emails.filter(
        email => email.id !== emailId
      );
      this.setState({ emails });
    });
  }
*/
  addEmail(email:IEmail) {
    /*Client.addEntry(`/v2/domains/${this.props.domainId}/emails`, email).then((email:IEmail) => (
      this.setState({
        emails : this.state.emails.concat([email])
      })
    ));*/
  }

  render() {
    const emails = this.getEmails();
    return (
      <div className="email-box">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Email Admin</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
          </Nav>
        </Navbar>
        <EmailForm
          domainId={`${this.props.domainId}`}
          addEmail={this.addEmail.bind(this)} />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Email</th>
              <th>Quota Used</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {emails}
          </tbody>
        </Table>
      </div>
    );
  }
}
