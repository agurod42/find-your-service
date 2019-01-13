import { Card, Col, Icon, Input, Layout, Row, Select } from 'antd';
import React from 'react';
import ServiceService from '@/services/service';

export default class IndexPage extends React.Component {

  state = {
    services: []
  }

  render() {
    return (
      <Layout.Content style={{ width: '100%' }}>
        <Row type='flex' justify='center'>
          <Col xs={12}>
            <Input placeholder='Search' prefix={<Icon type='search' />} addonAfter={this.renderDistanceSelect()} onChange={(e) => this.onQueryInputChange(e)} />
          </Col>
        </Row>
        <Row style={{ marginTop: 24 }}>
          {this.state.services.map(service => (
            <Col xs={12} md={6} lg={3}>
              <Card hoverable cover={<img alt='example' src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />}>
                <Card.Meta
                  title={service.title}
                  description={service.description}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Layout.Content>
    );
  }

  renderDistanceSelect() {
    return (
      <Select defaultValue='anywhere' onChange={(e) => this.onDistanceSelectChange(e)}>
        <Select.Option value='1000'>1 km</Select.Option>
        <Select.Option value='2000'>2 km</Select.Option>
        <Select.Option value='5000'>5 km</Select.Option>
        <Select.Option value='10000'>10 km</Select.Option>
        <Select.Option value='25000'>25 km</Select.Option>
        <Select.Option value='50000'>50 km</Select.Option>
        <Select.Option value='100000'>100 km</Select.Option>
        <Select.Option value='anywhere'>Anywhere</Select.Option>
      </Select>
    );
  }

  onQueryInputChange(e) {
    ServiceService
      .index({ title: e.target.value })
      .then(res => {
        this.setState({ services: res });
      });
  }

  onDistanceSelectChange(distance) {
    console.log(distance);
  }

}
