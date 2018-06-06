import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import SignOut from '../components/SignOut';

const Nav = (props) =>
    <div>
        {
            props.authUser
            ?
            <NavWithAuth authUser={props.authUser} username={props.username}/>
            :
            <NavWithoutAuth />
        }
    </div>
const NavWithAuth = (props) =>
    <Menu right>
      <p className="p_nav">
        Welcome to your designHAUS dashboard, {props.username}
        {/* Uid is: {props.authUser.uid}<br/>
        Email is: {props.authUser.email} */}
      </p>
      <a id="home" className="menu-item" href="/">HOME</a>
      <a id="about" className="menu-item" href="/categories">CATEGORIES</a>
      <a id="contact" className="menu-item" href="/user">USER HOME</a>
      <SignOut />
    </Menu>

const NavWithoutAuth = () =>
  <Menu right>
    <a id="home" className="menu-item" href="/">HOME</a>
    <a id="login" className="menu-item" href="/login">LOGIN</a>
    <a id="about" className="menu-item" href="/categories">CATEGORIES</a>
  </Menu>

export default Nav;
