import React from 'react';
import { auth } from '../firebase';

const SignOutButton = () =>
  <a className="menu-item"
    onClick={auth.doSignOut}
    href="#">
    SIGN OUT
  </a>

export default SignOutButton;
