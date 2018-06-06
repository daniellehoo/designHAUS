import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {auth} from '../firebase';
import SignUp from './SignUp';

const SignInPage = ({ history }) =>
  <div>
    <h1>SignIn</h1>
    <SignUp history={history} />
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (e) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push('/');
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    e.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div className="login">
        <h1> Please Sign In</h1>
        <form onSubmit={this.onSubmit}>
          <input
            value={email}
            onChange={e => this.setState(updateByPropertyName('email', e.target.value))}
            type="text"
            placeholder="Email Address"
          />

          <br />
          <input
            value={password}
            onChange={e => this.setState(updateByPropertyName('password', e.target.value))}
            type="password"
            placeholder="Password"
          />

          <br />
          <button disabled={isInvalid} type="submit">
            Sign In
          </button>

          { error && <p>{error.message}</p> }
        </form>
          <p> Don't have an account? {' '} </p>
            <div className="signup_link">
              <Link to={'/signup'}>Sign Up Here!</Link>
            </div>
    </div>
    );
  }
}

export default Login;

export {
  SignInPage,
};
