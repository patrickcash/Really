import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = ({ auth: { isAuthenticated, loading }, redirectPath='/login'}) => {
    if (!isAuthenticated && !loading) {
        return <Navigate to={redirectPath} replace />;
      }
    
    return <Outlet />;
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(PrivateRoute)