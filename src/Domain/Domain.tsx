import * as React from 'react';

export default class Domain extends React.Component<IDomainProps, undefined> {

  constructor(props: any) {
    super(props);
    this._handleDelete = this._handleDelete.bind(this);
  }

  render() {
    return(
        <tr>
          <td>{this.props.name}</td>
          <td>{this.props.quota}</td>          
        </tr>
    );
  }

  _handleDelete() {
//    this.props.onDelete(this.props.id)
  }
}
