import { Form, Input } from 'antd';
import React from 'react';

class ServiceForm extends React.Component {

    formRules = {
        email: [{ required: true, message: 'Email is required' }],
        password: [{ required: true, message: 'Password is required' }],
    }

    render() {
        return (
            <Form>
                {this.renderFormItem('title', 'Title', this.props.data.title,
                    <Input autoFocus type='text' placeholder='Service #1' />
                )}
                {this.renderFormItem('description', 'Description', this.props.data.description,
                    <Input type='text' placeholder='Lorem ipsum' />
                )}
                {this.renderFormItem('address', 'Address', this.props.data.address,
                    <Input type='text' placeholder='51 Sycamore Street' />
                )}
                {this.renderFormItem('city', 'City', this.props.data.city,
                    <Input type='text' placeholder='New York' />
                )}
                {this.renderFormItem('state', 'State', this.props.data.state,
                    <Input type='text' placeholder='NY' />
                )}
                {this.renderFormItem('zip_code', 'ZIP Code', this.props.data.zip_code,
                    <Input type='text' placeholder='10025' />
                )}
                {this.renderFormItem('location_lat', 'Latitude', this.props.data.location_lat,
                    <Input type='text' placeholder='40.7998309' />
                )}
                {this.renderFormItem('location_lon', 'Longitude', this.props.data.location_lon,
                    <Input type='text' placeholder='-73.9703027' />
                )}
            </Form>
        );
    }

    renderFormItem(name, label, value, children) {
        return (
            <Form.Item label={label} labelCol={{ xs: { span: 24, span: 6 } }} wrapperCol={{ xs: { span: 24, span: 18 } }}>
                {this.props.form.getFieldDecorator(name, { initialValue: value, rules: this.formRules[name] })(children)}
            </Form.Item>
        );
    }

}

export default Form.create()(ServiceForm);