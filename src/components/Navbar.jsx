import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../actions/auth';
import Alert from './Alert';

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <a className='navbar__auth__link' onClick={logout} href='#!'>Logout</a>
  );

  const guestLinks = (
    <>
        <Link className='navbar__auth__link' to='/login'>Login</Link>
        <Link className='navbar__auth__link' to='/signup'>Sign Up</Link>
    </>
  );

  return (
    <>
        <nav className='navbar'>
            <div className='navbar__logo'>
                <NavLink className='navbar__logo__link' exact to='/'>Really</NavLink>
            </div>
            <div className='navbar__item'>
                <NavLink className='navbar__item__link' exact to='/listings'>Listings</NavLink>
            </div>
            <div className='navbar__item'>
                <NavLink className='navbar__item__link' exact to='/contact'>Contact</NavLink>
            </div>
            <div className='navbar__item'>
                <NavLink className='navbar__item__link' exact to='/about'>About</NavLink>
            </div>
            <div className='navbar__auth'>
                { !loading && (<>{ isAuthenticated ? authLinks : guestLinks }</>) }
            </div>
        </nav>
        <Alert />
    </>
  )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)