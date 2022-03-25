import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { login } from '../actions/auth';

export const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {email, password} = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
      e.preventDefault();
      login(email, password);
  };

  if (isAuthenticated)
    return <Navigate to='/' />;
  
  return (
    <div className='auth'>
      <Helmet>
        <title>Really - Login</title>
        <meta
            name='description'
            content='login page'
        />
      </Helmet>
      <h1 className='auth__title'>Sign In</h1>
      <p className='auth__lead'>Sign into your Account</p>
      <form className='auth__form' onSubmit={e => onSubmit(e)}>
        <div className='auth__form__group'>
          <input 
            className='auth__form__input'
            type='email'
            placeholder='Email'
            name='email' value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='auth__form__group'>
          <input
            className='auth__form__input'
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            minLength='6'
          />
        </div>
        <button className='auth__form__button'>Login</button>
      </form>
      <p className='auth__authtext'>
        <Link className='auth__authtext__link' to='/signup'>Sign Up</Link>
      </p>
    </div>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = {
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
