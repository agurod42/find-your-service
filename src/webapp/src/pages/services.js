import { Card, Table } from 'antd';
import React from 'react';
import ServiceService from '@/services/service';
import { withApiUtils } from '@/decorators/withApiUtils';

@withApiUtils()
class ServicesPage extends React.Component {

  state = {
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
      <Card style={{ width: '100%' }}>
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
          ]}
          dataSource={this.state.services} 
          rowKey='id'
        />
      </Card>
    );
  }

}

export default ServicesPage;
