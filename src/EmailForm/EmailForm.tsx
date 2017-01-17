import * as React from 'react';

import { Modal, FormGroup, FormControl, Button, InputGroup } from 'react-bootstrap';

export default class EmailForm extends React.Component<IEmailFormProps, IEmailFormState> {

  constructor() {
    super();

    this.state = {
      username: '',
      quota: '',
      password: '',
      showModal: false
    };
  }

  handleSubmit(event: any) {
    event.preventDefault();

    const username: string = this.state.username.trim();
    const quota: string = this.state.quota.trim();
    const password = this.state.password.trim();

    if (!username || !quota || !password) {
      return;
    }

    this.props.addEmail({ username: username, quota: quota, password: password, domain_id: this.props.domainId });

    this.setState({
      username: '',
      quota: '',
      password: '',
      showModal: false
    });
  }

  handleUsernameChange(e: any) {
    let newState:IEmailFormState = this.state;
    newState.username = e.target.value;
    this.setState(newState);
    //this.setState({ username: e.target.value });
    //this.state.username = e.target.value;
  }

  handleQuotaChange(e: any) {
    let newState:IEmailFormState = this.state;
    newState.quota = e.target.value;
    this.setState(newState);
  }

  handlePasswordChange(e: any) {
    let newState:IEmailFormState = this.state;
    newState.password = e.target.value;
    this.setState(newState);
  }

  open() {
    let newState:IEmailFormState = this.state;
    newState.showModal = true;
    this.setState(newState);
  }

  close() {
    let newState:IEmailFormState = this.state;
    newState.showModal = false;
    this.setState(newState);
  }

  render() {
    return (
      <div className="email-form">
        <Button bsStyle="success" onClick={this.open.bind(this)}>New Email</Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>New Email Account</Modal.Title>
          </Modal.Header>

          <form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId="1">
              <Modal.Body>
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="email username"
                    value={this.state.username}
                    onChange={this.handleUsernameChange.bind(this)}
                  />
                  <InputGroup.Addon>@{this.props.domainName}</InputGroup.Addon>
                </InputGroup>
                <FormControl
                  type="password"
                  placeholder="password"
                  value={this.state.quota}
                  onChange={this.handleQuotaChange.bind(this)}
                />
                <FormControl
                  type="password"
                  placeholder="confirm password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange.bind(this)}
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
