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
    let emails: Array<IEmailProps> = [];

    const config: AxiosRequestConfig = {
      //url: url,
      //method: 'get',
      responseType: 'json',
      headers: {
        'Accept': 'application/json'
      }
    };

    axios.get(url, config)
      .then((response: AxiosResponse) => {
        const emailsHash: any = response.data;

        for (let emailEntry of emailsHash) {
          //const emailEntry = emailsHash[key];
          //emails[Number(key)] = {key: emailEntry.id, username: emailEntry.username, quota: emailEntry.quota};
          emails.push({ key: emailEntry.id, username: emailEntry.username, quota: emailEntry.quota });
        }
        this.setState({ emails: emails });
      })
      .catch(this.handleError);
    /*
        Client.getEntries(url).then((emails) => (
            this.setState({emails: emails})
        ));*/
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
/*
  addEmail(email:IEmail) {
    axios.post(`/v2/domains/${this.props.domainId}/emails`, email)
      .then((response) => {
        //let newEmail:IEmailProps = {key: email.username, username: email.username, quota: email.quota};
        this.setState({emails: this.state.emails.concat([{key: email.username, username: email.username, quota: email.quota}])});
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    /*Client.addEntry(`/v2/domains/${this.props.domainId}/emails`, email).then((email:IEmail) => (
      this.setState({
        emails : this.state.emails.concat([email])
      })
    ));
  }
*/
addEmail(email:IEmail) {}

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
