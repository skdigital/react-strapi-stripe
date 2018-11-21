import React from 'react';
import { Container, Box, Button, Heading, Text, TextField } from 'gestalt';
import ToastMessage from './shared/ToastMessage';
import { setToken } from '../utils/helpers';

import Strapi from 'strapi-sdk-javascript/build/main';
const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class Signup extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    toast: false,
    toastMessage: '',
    loading: false
  };

  handleChange = ({ event, value }) => {
    event.persist();
    this.setState({ [event.target.name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { username, email, password } = this.state;
    if (this.isFormEmpty(this.state)) {
      this.showToast('Fill in all the fields!');
    }

    // Sign up user
    try {
      // set loading
      this.setState({ loading: true });
      // make request to register user with strapi
      const response = await strapi.register(username, email, password);
      // set loading - false
      this.setState({ loading: false });
      console.log(response);
      // put token (to manage user session) in local storage
      setToken(response.jwt);
      // redirect to homepage
      this.redirectUser('/');
    } catch (err) {
      // set loading - false
      this.setState({ loading: false });
      // show error messgae
      this.showToast(err.message);
    }
  };

  redirectUser = path => this.props.history.push(path);

  // takes state object in arguement
  isFormEmpty = ({ username, email, password }) => {
    return !username || !email || !password;
  };

  showToast = toastMessage => {
    this.setState({ toast: true, toastMessage });
    setTimeout(() => {
      this.setState({ toast: false, toastMessage: '' });
    }, 4000);
  };

  render() {
    const { toastMessage, toast } = this.state;
    return (
      <React.Fragment>
        <Container>
          <Box
            dangerouslySetInlineStyle={{
              __style: { backgroundColor: '#ebe2da' }
            }}
            margin={4}
            padding={4}
            shape="rounded"
            display="flex"
            justifyContent="center"
          >
            {/* Sign Up Form */}
            <form
              style={{
                display: 'inlineBlock',
                textAlign: 'center',
                maxWidth: 450
              }}
              onSubmit={this.handleSubmit}
            >
              {/* Sign Up Form Heading */}
              <Box
                marginBottom={2}
                display="flex"
                direction="column"
                alignItems="center"
              >
                <Heading color="midnight">Let's Get Started</Heading>
                <Text italic color="orchid">
                  Sign up to roder some brews!
                </Text>
              </Box>
              <TextField
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                onChange={this.handleChange}
              />
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
              />
              <TextField
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
              <Button inline color="blue" type="submit" text="Submit" />
            </form>
          </Box>
          <ToastMessage show={toast} message={toastMessage} />
        </Container>
      </React.Fragment>
    );
  }
}

export default Signup;
