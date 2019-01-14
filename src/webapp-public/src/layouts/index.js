import { Col, Layout, Row } from 'antd'
import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <Layout>
        <Layout.Header>
          <Row type='flex' justify='space-between'>
            <Col />
          </Row>
        </Layout.Header>
        <Layout style={{ alignItems: 'center', padding: 48 }}>
          {this.props.children}
        </Layout>
      </Layout>
    )
  }
}
