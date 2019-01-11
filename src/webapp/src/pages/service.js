import { Button, Card, Modal, Table } from 'antd';
import React from 'react';
import ServiceModal from '@/components/modal/service';
import { withApiUtils } from '@/decorators/withApiUtils';
import { withAuthGuard } from '@/decorators/withAuthGuard';
import ServiceService from '@/services/service';

@withApiUtils()
@withAuthGuard()
class ServicePage extends React.Component {

  state = {
    modalMode: 'add',
    modalVisible: false,
    services: []
  }

  constructor(props) {
    super(props);

    ServiceService
      .index()
      .then(res => this.setState({ services: res.data }))
      .catch(err => this.props.apiUtils.errorHandler(err, () => this.setState({ error: err })));
  }

  render() {
    return (
      <Card 
        title='Services' 
        extra={<Button type='primary' icon='plus' onClick={() => this.setState({ modalVisible: true })}>Add Service</Button>}
        style={{ width: '100%' }}>
          <Table
            size='small'
            columns={[
              { dataIndex: 'title', title: 'Title' },
              { dataIndex: 'description', title: 'Description' },
              { dataIndex: 'address', title: 'Address' },
              { dataIndex: 'city', title: 'City' },
              { dataIndex: 'state', title: 'State' },
              { dataIndex: 'zip_code', title: 'ZIP Code' },
              { dataIndex: 'location', title: 'Location', render: (_, record) => `${record.location_lat},${record.location_lon}` },
              { render: () => this.renderRowActions() }
            ]}
            dataSource={this.state.services} 
            rowKey='id'
          />
          <ServiceModal
            mode={this.state.modalMode}
            visible={this.state.modalVisible}
            onOk={this.handleOk}
            onCancel={() => this.setState({ modalVisible: false })}
          />
      </Card>
    );
  }

  renderRowActions() {
    return (
      <div>
        <Button type='default' icon='edit' />
        <Button type='danger' icon='delete' />
      </div>
    )
  }

}

export default ServicePage;
