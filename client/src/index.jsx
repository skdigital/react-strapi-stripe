import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'gestalt/dist/gestalt.css';

import App from './components/App';
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Checkout from './components/Checkout';
import Brews from './components/Brews';

import registerServiceWorker from './registerServiceWorker';

// 404 error
const NoMatch = () => (
  <h3>
    404 error, the page you are looking for does not exist!
    <br />
    <br />
    <Link to="/">Home</Link>
  </h3>
);

// Roots
const Root = () => (
  <Router>
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact component={App} path="/" />
        <Route component={Signin} path="/signin" />
        <Route component={Signup} path="/signup" />
        <Route component={Checkout} path="/checkout" />
        <Route component={Brews} path="/:brandId" />
        <Route component={NoMatch} />
      </Switch>
    </React.Fragment>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
