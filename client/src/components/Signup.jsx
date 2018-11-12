import React from 'react';
import { Container, Box, Button, Heading, Text, TextField } from 'gestalt';
import ToastMessage from './shared/ToastMessage';

class Signup extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    toast: false,
    toastMessage: ''
  };

  handleChange = ({ event, value }) => {
    event.persist();
    this.setState({ [event.target.name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.isFormEmpty(this.state)) {
      this.showToast('Fill in all the fields!');
    }
    console.log('submitted');
  };

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
