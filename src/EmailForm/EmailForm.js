import React, { Component } from 'react';

class EmailForm extends Component {

  constructor() {
    super();

    this.state = {
      id: '',
      username: '',
      quota: '',
      password: ''
    };
  }

  _handleSubmit(event) {
    event.preventDefault();

    const username = this.state.username.trim();
    const quota = this.state.quota.trim();
    const password = this.state.password.trim();

    if (!username || !quota || !password) {
      return;
    }

    this.props.addEmail({ username: username, quota: quota, password: password, domain_id: this.props.domainId});

    this.setState({
      id: '',
      username: '',
      quota: '',
      password: ''
    });
  }

  _handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  _handleQuotaChange(e) {
    this.setState({ quota: e.target.value });
  }

  _handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <form className="email-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>New Email Account</label>
        <div className="email-form-fields">
          <input type="text" placeholder="email username" value={this.state.username} onChange={this._handleUsernameChange.bind(this)} />
          <input type="text" placeholder="quota" value={this.state.quota} onChange={this._handleQuotaChange.bind(this)} />
          <input type="text" placeholder="password" value={this.state.password} onChange={this._handlePasswordChange.bind(this)} />
        </div>
        <div className="email-form-actions">
          <input id="add-email-button" type="submit" value="Add Email" />

        </div>
      </form>
    );
  }

}

export default EmailForm;
