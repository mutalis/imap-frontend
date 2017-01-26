import * as React from 'react';

import { Modal, FormGroup, FormControl, Button, InputGroup } from 'react-bootstrap';

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

export default class EmailPwd extends React.Component<IEmailPwdProps, IEmailPwdState> {

  constructor() {
    super();

    this.state = {
      password: '',
      passwordConfirmation: '',
      showModal: false,
      pwdValidationState: null,
      confirmationValidationState: null,
      validationMessage: '',
      disableSubmit: true
    };
    // Defaults
    axios.defaults.baseURL = 'http://api.example.com:3000';
    axios.defaults.headers.common['Authorization'] = 'Token token=1c3befd671a274b0e0fd6b589edfeeb6';
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

  handleSubmit(event: any) {
    event.preventDefault();
    const password: string = this.state.password;

    if (!password) {
      return;
    }
    else {
      let payload = JSON.stringify({ password: password });

      const config: AxiosRequestConfig = {
        responseType: 'json',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8'
        }
      };

      axios.patch(`/v2/emails/${this.props.emailId}`, payload, config)
        .then((response: AxiosResponse) => {
          console.log(response.data);
        })
        .catch(this.handleError);

      this.setState({
        password: '',
        passwordConfirmation: '',
        showModal: false,
        pwdValidationState: null,
        confirmationValidationState: null,
        validationMessage: '',
        disableSubmit: true
      });
    }
  }

  handlePasswordChange(e: any) {
    let newState: IEmailPwdState = this.state;
    if (e.target.id == 'pwd') {
      newState.password = e.target.value;
      newState.pwdValidationState = this.setValidationState(newState.password);
    } else {
      newState.passwordConfirmation = e.target.value;
      newState.confirmationValidationState = this.setValidationState(newState.passwordConfirmation);
    }

    if (newState.password != newState.passwordConfirmation) {
      newState.validationMessage = 'Passwords must match.';
      newState.disableSubmit = true;
    } else {
      newState.validationMessage = '';
      if (newState.pwdValidationState == 'success' && newState.confirmationValidationState == 'success') {
        newState.disableSubmit = false;
      }
    }
    this.setState(newState);
  }

  open() {
    let newState:IEmailPwdState = this.state;
    newState.showModal = true;
    this.setState(newState);
  }

  close() {
    let newState:IEmailPwdState = this.state;
    newState.showModal = false;
    this.setState(newState);
  }

  setValidationState(pwd: string): string {
    const password: string = pwd.trim();
    const length: number = password.length;

    if (length > 7) return 'success';
    else if (length > 3) return 'warning';
    else if (length > 0) return 'error';
  }

  render() {
    return (
      <div className="email-pwd">
        <Button bsStyle="success" onClick={this.open.bind(this)}>Change Password</Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Username: {this.props.username}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <FormGroup controlId="" validationState={this.state.pwdValidationState} >
                <FormControl
                  type="password"
                  placeholder="Enter a new password"
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
                <p>{this.state.validationMessage}</p>
              </FormGroup>

              <Button bsStyle="success" type="submit" disabled={this.state.disableSubmit}>Change Password</Button>

            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }

}
