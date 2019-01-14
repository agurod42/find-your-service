import { Button, Col, Layout, Menu, Row } from 'antd'
import React from 'react'
import AuthService from '@/services/auth'

export default class extends React.Component {
  render () {
    const location = this.props.location.pathname.split('/')
    const userAuthenticated = AuthService.isUserAuthenticated()
    return (
      <Layout>
        <Layout.Header>
          <Row type='flex' justify='space-between'>
            <Col />
            <Col>
              <Menu theme='dark' mode='horizontal' defaultSelectedKeys={[location[1]]} style={{ lineHeight: '64px' }}>
                {userAuthenticated && <Menu.Item><Button ghost onClick={() => this.onLogoutButtonClick()}>Logout</Button></Menu.Item>}
              </Menu>
            </Col>
          </Row>
        </Layout.Header>
        <Layout style={{ alignItems: 'center', padding: 48 }}>
          {this.props.children}
        </Layout>
      </Layout>
    )
  }

  onLogoutButtonClick () {
    AuthService.deauthenticate()
    this.props.history.push('/')
  }
}
