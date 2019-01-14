import { Card, Col, Icon, Input, Layout, Row, Select } from 'antd'
import React from 'react'
import Img from 'react-image'
import ServiceService from '@/services/service'

export default class IndexPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      geolocation: false,
      q: {},
      services: []
    }
  }

  componentDidMount () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          geolocation: true,
          q: { ...this.state.q, distance_to: `${position.coords.latitude},${position.coords.longitude}` }
        })
      })
    }

    this.onQueryInputChange({ target: { value: '' } })
  }

  render () {
    return (
      <Layout.Content style={{ width: '100%' }}>
        <Row type='flex' justify='center'>
          <Col xs={12}>
            <Input placeholder='Search' prefix={<Icon type='search' />} addonAfter={this.renderDistanceSelect()} onChange={(e) => this.onQueryInputChange(e)} />
          </Col>
        </Row>
        {this.state.geolocation &&
          <Row type='flex' justify='center' style={{ marginTop: 6 }}>
            <Col>
              <sub><Icon type='info-circle' /> Search by distance is relative to <a target='_blank' href={`https://www.google.com.uy/maps/@${this.state.q.distance_to}`}>{this.state.q.distance_to}</a></sub>
            </Col>
          </Row>
        }
        <Row style={{ marginTop: 24 }} gutter={16}>
          {this.state.services.map(service => (
            <Col xs={12} md={6} lg={4} style={{ marginBottom: 16 }}>
              <Card hoverable cover={<Img alt={service.title} src={`https://picsum.photos/200/200/?random&t=${service.id}`} />}>
                <Card.Meta
                  title={service.title}
                  description={service.description}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Layout.Content>
    )
  }

  renderDistanceSelect () {
    return (
      <Select defaultValue='anywhere' onChange={(e) => this.onDistanceSelectChange(e)}>
        <Select.Option disabled={!this.state.geolocation} value='1000'>1 km</Select.Option>
        <Select.Option disabled={!this.state.geolocation} value='2000'>2 km</Select.Option>
        <Select.Option disabled={!this.state.geolocation} value='5000'>5 km</Select.Option>
        <Select.Option disabled={!this.state.geolocation} value='10000'>10 km</Select.Option>
        <Select.Option disabled={!this.state.geolocation} value='25000'>25 km</Select.Option>
        <Select.Option disabled={!this.state.geolocation} value='50000'>50 km</Select.Option>
        <Select.Option disabled={!this.state.geolocation} value='100000'>100 km</Select.Option>
        <Select.Option value='anywhere'>Anywhere</Select.Option>
      </Select>
    )
  }

  onQueryInputChange (e) {
    ServiceService
      .index({ ...this.state.q, title: e.target.value })
      .then(res => {
        this.setState({ services: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  onDistanceSelectChange (distance) {
    let q = {}

    if (distance !== 'anywhere') {
      q.distance = distance
    }

    ServiceService
      .index({ ...this.state.q, ...q })
      .then(res => {
        this.setState({ services: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
