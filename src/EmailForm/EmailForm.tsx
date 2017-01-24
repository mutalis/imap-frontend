import * as React from 'react';

import { Modal, FormGroup, FormControl, Button, InputGroup } from 'react-bootstrap';

export default class EmailForm extends React.Component<IEmailFormProps, IEmailFormState> {

  constructor() {
    super();

    this.state = {
      username: '',
      quota: '',
      userValidationState: null,
      password: '',
      passwordConfirmation: '',
      pwdValidationState: null,
      confirmationValidationState: null,
      pwdValidationMessage: '',
      userValidationMessage: '',
      disableSubmit: true,
      showModal: false
    };
  }

  handleSubmit(event: any) {
    event.preventDefault();

    const username: string = this.state.username;
    const password: string = this.state.password;
    const quota: string = '0';

    if (!username || !quota || !password) {
      return;
    }

    this.props.addEmail({ username: username, quota: quota, password: password, domain_id: this.props.domainId });

    this.setState({
      username: '',
      quota: '',
      userValidationState: null,
      password: '',
      passwordConfirmation: '',
      pwdValidationState: null,
      confirmationValidationState: null,
      pwdValidationMessage: '',
      userValidationMessage: '',
      disableSubmit: true,
      showModal: false
    });
  }

  handleUsernameChange(e: any) {
    let newState:IEmailFormState = this.state;
    newState.username = e.target.value.trim();
    newState.userValidationState = this.validateUsername(newState.username);

    if (newState.userValidationState == 'error') {
      newState.userValidationMessage = 'Invalid username.';
      newState.disableSubmit = true;
    } else {
      newState.userValidationMessage = '';
      if ((newState.userValidationState == 'success' && newState.pwdValidationState == 'success' && newState.confirmationValidationState == 'success')) {
        newState.disableSubmit = false;
      }
    }
    this.setState(newState);
    //this.setState({ username: e.target.value });
    //this.state.username = e.target.value;
  }

  handleQuotaChange(e: any) {
  }

  handlePasswordChange(e: any) {
    let newState: IEmailFormState = this.state;
    if (e.target.id == 'pwd') {
      newState.password = e.target.value.trim();
      newState.pwdValidationState = this.checkLength(newState.password, 8);
    } else {
      newState.passwordConfirmation = e.target.value.trim();
      newState.confirmationValidationState = this.checkLength(newState.passwordConfirmation, 8);
    }
    if (newState.password != newState.passwordConfirmation) {
      newState.pwdValidationMessage = 'Passwords must match.';
      newState.disableSubmit = true;
    } else {
      newState.pwdValidationMessage = '';
      if ((newState.userValidationState == 'success' && newState.pwdValidationState == 'success' && newState.confirmationValidationState == 'success')) {
        newState.disableSubmit = false;
      }
    }
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

  checkLength(entry: string, limit: number): string {
    const length: number = entry.trim().length;

    console.log(length);
    if (length >= limit) return 'success';
    else if (length > (Math.round(limit/2))) return 'warning';
    else if (length > 0) return 'error';
  }

  validateUsername(username: string): string {
    if ((/^[a-z]{1,1}([a-z\d.-]){0,61}$/.test(username))) {
      return 'success';
    } else {
      return 'error';
    }
  }

  render() {
    return (
      <div className="email-form">
        <Button bsStyle="success" onClick={this.open.bind(this)}>New Email</Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>New Email Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <FormGroup controlId="" validationState={this.state.userValidationState} >
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="email username"
                    value={this.state.username}
                    onChange={this.handleUsernameChange.bind(this)}
                    id="username"
                  />
                  <InputGroup.Addon>@{this.props.domainName}</InputGroup.Addon>
                  <FormControl.Feedback />
                </InputGroup>
                <p>{this.state.userValidationMessage}</p>
              </FormGroup>
              <FormGroup controlId="" validationState={this.state.pwdValidationState} >
                <FormControl
                  type="password"
                  placeholder="Enter a password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange.bind(this)}
                  id="pwd"
                />
                <FormControl.Feedback />
              </FormGroup>
              <p>The password must be at least 8 characters long.</p>
              <FormGroup controlId="" validationState={this.state.confirmationValidationState} >
                <FormControl
                  type="password"
                  placeholder="Retype password"
                  value={this.state.passwordConfirmation}
                  onChange={this.handlePasswordChange.bind(this)}
                  id="pwdConfirmation"
                />
                <FormControl.Feedback />
                <p>{this.state.pwdValidationMessage}</p>
              </FormGroup>
              <Button bsStyle="success" type="submit" disabled={this.state.disableSubmit}>Add Email</Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }

}
