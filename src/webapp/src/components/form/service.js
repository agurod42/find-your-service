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
                <Form.Item>
                    {this.renderFormItem('title', 
                        <Input autoFocus type='text' placeholder='Title' />
                    )}
                </Form.Item>
                <Form.Item>
                    {this.renderFormItem('description', 
                        <Input type='text' placeholder='Description' />
                    )}
                </Form.Item>
                <Form.Item>
                    {this.renderFormItem('address', 
                        <Input type='text' placeholder='Address' />
                    )}
                </Form.Item>
                <Form.Item>
                    {this.renderFormItem('city', 
                        <Input type='text' placeholder='City' />
                    )}
                </Form.Item>
                <Form.Item>
                    {this.renderFormItem('state', 
                        <Input type='text' placeholder='State' />
                    )}
                </Form.Item>
                <Form.Item>
                    {this.renderFormItem('zip_code', 
                        <Input type='text' placeholder='ZIP Code' />
                    )}
                </Form.Item>
                <Form.Item>
                    {this.renderFormItem('location_lat', 
                        <Input type='text' placeholder='Location' />
                    )}
                </Form.Item>
                <Form.Item>
                    {this.renderFormItem('location_lon', 
                        <Input type='text' placeholder='Location' />
                    )}
                </Form.Item>
            </Form>
        );
    }

    renderFormItem(name, children) {
        return this.props.form.getFieldDecorator(name, { rules: this.formRules[name] })(children);
    }

}

export default Form.create()(ServiceForm);