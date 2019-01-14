import React from 'react'
import { Redirect } from 'react-router'
import AuthService from '@/services/auth'

export default class IndexPage extends React.Component {
  render () {
    if (AuthService.isUserAuthenticated()) {
      return <Redirect to='service' />
    } else {
      return <Redirect to='auth' />
    }
  }
}
