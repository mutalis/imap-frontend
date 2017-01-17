import * as React from 'react';

import Email from '../Email/Email';

import EmailForm from '../EmailForm/EmailForm';

import { Navbar, Nav, NavItem, Table } from 'react-bootstrap';

import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  AxiosAdapter,
  Cancel,
  CancelToken,
  CancelTokenSource,
  Canceler
} from 'axios';

export class EmailBox extends React.Component<IEmailBoxProps, IEmailBoxState> {

  constructor() {
    super();
    this.state = {
      emails: []
    };
    // Defaults
    axios.defaults.baseURL = 'http://api.example.com:3000';
    axios.defaults.headers.common['Authorization'] = 'Token token=e8a947943367d7f358794f6141ece2ca';
  }

  componentWillMount() {
    this.fetchEmails(`/v2/domains/${this.props.domainId}/emails`);
  }

  handleError(error: AxiosError) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      console.log(error.message);
    }
    console.log(error.config);
  }

  fetchEmails(url:string) {
    let emails: Array<IEmailBox> = [];

    const config: AxiosRequestConfig = {
      responseType: 'json',
      headers: {
        'Accept': 'application/json'
      }
    };

    axios.get(url, config)
      .then((response: AxiosResponse) => {
        const emailsResponse: any = response.data;

        for (let emailEntry of emailsResponse) {
          //const emailEntry = emailsHash[key];
          //emails[Number(key)] = {key: emailEntry.id, username: emailEntry.username, quota: emailEntry.quota};
          emails.push({ key: emailEntry.id, username: emailEntry.username, quota: emailEntry.quota });
        }
        this.setState({ emails: emails });
      })
      .catch(this.handleError);
  }

  getEmails() {
    return this.state.emails.map((email) => {
      return <Email
               key={email.key}
               emailId={email.key}
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

  addEmail(email: IEmail) {
    let payload = JSON.stringify(email);

    const config: AxiosRequestConfig = {
      responseType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      }
    };
    axios.post(`/v2/domains/${this.props.domainId}/emails`, payload, config)
      .then((response: AxiosResponse) => {
        let newEmail:IEmailBox = { key: response.data.id, username: response.data.username, quota: response.data.quota };
        this.setState({ emails: this.state.emails.concat([newEmail]) });
      })
      .catch(this.handleError);
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
          domainId={this.props.domainId}
          domainName={this.props.domainName}
          addEmail={this.addEmail.bind(this)} />
        <h4>Domain Name: {this.props.domainName}</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Username</th>
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
