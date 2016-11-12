import React, { Component } from 'react';
import Client from '../Client';
import Domain from '../Domain/Domain';
import { Navbar, Table } from 'react-bootstrap';

class DomainBox extends Component {

  constructor() {
    super();

    this.state = {
      domains: []
    };
  }

  componentWillMount() {
    this._fetchDomains('/v2/domains');
  }

  render() {
    const domains = this._getDomains();
    return (
      <div className="domain-box">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Email Admin</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Domain</th>
              <th>Quota Used</th>
              <th colspan="2"></th>
            </tr>
          </thead>
          <tbody>
            {domains}
          </tbody>
        </Table>
      </div>
    );
  }

  _fetchDomains(url) {
    Client.getEntries(url).then((domains) => (
        this.setState({
          domains : domains
        })
    ));
  }

  _getDomains() {
    return this.state.domains.map((domain) => {
      return <Domain
               key={domain.id}
               id={domain.id}
               name={domain.name}
               quota={domain.quota}
               onDelete={this._deleteDomain.bind(this)} />
    });
  }

  _deleteDomain(domainId) {
    const domains = this.state.domains.filter(
      domain => domain.id !== domainId
    );
    // console.log(domainId);
    this.setState({ domains });
  }
}

export default DomainBox;
