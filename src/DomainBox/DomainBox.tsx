import * as React from 'react';

import Domain from '../Domain/Domain';

export class DomainBox extends React.Component<undefined, IDomainBoxState> {

  constructor(props: any) {
    super(props);

    this.state = {
      domains: [{name: 'aa', quota: '11'}, {name: 'bb', quota: '22'}]
    };
  }

  componentWillMount() {
    //this._fetchDomains('/v2/domains');
  }

  render() {
    const domains = this._getDomains();
    return (
      <div className="domain-box">
        <table>
          <thead>
            <tr>
              <th>Domain</th>
              <th>Quota Used</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {domains}
          </tbody>
        </table>
      </div>
    );
  }

  _fetchDomains(url: string) {
    
  }

  _getDomains() {
    return this.state.domains.map((domain) => {
      return <Domain
               name={domain.name}
               quota={domain.quota}
             />
    });
  }

  _deleteDomain(domainId: string) {
  }

}