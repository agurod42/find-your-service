import { Col, Layout, Menu, Row } from 'antd';
import React from 'react';
import NavLink from 'umi/navlink';
import AuthService from '@/services/auth';

export default class extends React.Component {

  render() {
		const location = this.props.location.pathname.split('/');
    const userAuthenticated = AuthService.isUserAuthenticated();
    return (
      <Layout>
        <Layout.Header>
          <Row type='flex' justify='space-between'>
            <Col>
              {/* <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']} style={{ lineHeight: '64px' }}>
                <Menu.Item key='1'>Services</Menu.Item>
              </Menu> */}
            </Col>
            <Col>
              <Menu theme='dark' mode='horizontal' defaultSelectedKeys={[location[1]]} style={{ lineHeight: '64px' }}>
                {!userAuthenticated && <Menu.Item key='auth'><NavLink to='/auth'>Login</NavLink></Menu.Item>}
                {userAuthenticated && <Menu.Item>Logout</Menu.Item>}
              </Menu>
            </Col>
          </Row>
        </Layout.Header>
        <Layout style={{ alignItems: 'center', padding: 48 }}>
          {this.props.children}
        </Layout>
      </Layout>
    );
  }

}