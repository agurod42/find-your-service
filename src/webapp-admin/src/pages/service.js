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
    modalData: {},
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
        extra={<Button type='primary' icon='plus' onClick={() => this.setState({ modalData: {}, modalMode: 'add', modalVisible: true })}>Add Service</Button>}
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
              { render: (_, record) => this.renderRowActions(record) }
            ]}
            dataSource={this.state.services} 
            rowKey='id'
          />
          <ServiceModal
            data={this.state.modalData}
            mode={this.state.modalMode}
            visible={this.state.modalVisible}
            onOk={(_, data) => this.onOkButtonClick(data)}
            onCancel={() => this.setState({ modalVisible: false })}
          />
      </Card>
    );
  }

  renderRowActions(service) {
    return (
      <div>
        <Button type='default' icon='edit' onClick={() => this.onEditButtonClick(service)} />
        <Button type='danger' icon='delete' onClick={() => this.onDeleteButtonClick(service)} />
      </div>
    )
  }

  onOkButtonClick(service) {
    if (this.state.modalMode === 'add') {
      ServiceService
          .create(service)
          .then(res => this.setState({ modalVisible: false, services: res.data }))
    }
    else if (this.state.modalMode === 'edit') {
        ServiceService
            .update(this.state.modalData.id, service)
            .then(res => this.setState({ modalVisible: false, services: res.data }))
    }
  }

  onEditButtonClick(service) {
    ServiceService
      .show(service.id)
      .then(res => this.setState({ modalData: res.data, modalMode: 'edit', modalVisible: true }))
      .catch(err => this.props.apiUtils.errorHandler(err, () => this.setState({ error: err })));
  }

  onDeleteButtonClick(service) {
    ServiceService
      .delete(service.id)
      .then(res => this.setState({ services: res.data }))
      .catch(err => this.props.apiUtils.errorHandler(err, () => this.setState({ error: err })));
  }

}

export default ServicePage;
