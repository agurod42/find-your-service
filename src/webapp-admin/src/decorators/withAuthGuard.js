import React from 'react'
import { Redirect } from 'react-router'
import AuthService from '@/services/auth'

export const withAuthGuard = () => (WrappedComponent) => {
  return class extends React.Component {
    render () {
      if (!AuthService.isUserAuthenticated()) {
        return <Redirect to='/' />
      } else {
        return <WrappedComponent {...this.props} />
      }
    }
  }
}
