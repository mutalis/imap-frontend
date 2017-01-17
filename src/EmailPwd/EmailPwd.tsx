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
      showModal: false
    };
    // Defaults
    axios.defaults.baseURL = 'http://api.example.com:3000';
    axios.defaults.headers.common['Authorization'] = 'Token token=e8a947943367d7f358794f6141ece2ca';
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

    const password = this.state.password.trim();

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
        showModal: false
      });
    }
  }

  handlePasswordChange(e: any) {
    let newState:IEmailPwdState = this.state;
    newState.password = e.target.value;
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

  render() {
    return (
      <div className="email-pwd">
        <Button bsStyle="success" onClick={this.open.bind(this)}>Change Password</Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Username: {this.props.username}</Modal.Title>
          </Modal.Header>

          <form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId="2">
              <Modal.Body>
                <FormControl
                  type="password"
                  placeholder="confirm password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange.bind(this)}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle="success" type="submit">Change Password</Button>
              </Modal.Footer>
            </FormGroup>
          </form>
        </Modal>
      </div>
    );
  }

}
