import React, { Component } from 'react';
import { Modal, FormGroup, FormControl, Button } from 'react-bootstrap';

class EmailForm extends Component {

  constructor() {
    super();

    this.state = {
      id: '',
      username: '',
      quota: '',
      password: '',
      showModal: false
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
      password: '',
      showModal: false
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

  _open() {
    this.setState({ showModal: true });
  }

  _close() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div className="email-form">
        <Button bsStyle="success" onClick={this._open.bind(this)}>New Email</Button>

        <Modal show={this.state.showModal} onHide={this._close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>New Email Account</Modal.Title>
          </Modal.Header>

          <form onSubmit={this._handleSubmit.bind(this)}>
            <FormGroup>
              <Modal.Body>
                <FormControl
                  type="text"
                  placeholder="email username"
                  value={this.state.username}
                  onChange={this._handleUsernameChange.bind(this)}
                />
                <FormControl
                  type="text"
                  placeholder="quota"
                  value={this.state.quota}
                  onChange={this._handleQuotaChange.bind(this)}
                />
                <FormControl
                  type="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this._handlePasswordChange.bind(this)}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle="success" type="submit">Add Email</Button>
              </Modal.Footer>
            </FormGroup>
          </form>
        </Modal>
      </div>
    );
  }

}

export default EmailForm;
