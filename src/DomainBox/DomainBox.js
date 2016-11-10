import React, { Component } from 'react';
import Client from '../Client';
import Domain from '../Domain/Domain';
// import logo from '../logo.svg';
// import '../App.css';

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
        <div className="domain-list">
          {domains}
        </div>
        <p>SSS</p>
      </div>
    );
  }

  _fetchDomains(url) {
    Client.search(url).then((domains) => (
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
