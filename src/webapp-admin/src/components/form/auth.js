import { Button, Form, Icon, Input } from 'antd';
import React from 'react';

class ServiceForm extends React.Component {

    formRules = {
        email: [{ required: true, message: 'Email is required' }],
        password: [{ required: true, message: 'Password is required' }],
    }

    render() {
        return (
            <Form onSubmit={(e) => this.onFormSubmit(e)}>
                {this.renderFormItem('email', 'Email', '',
                    <Input autoFocus type='email' placeholder='Email' prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} />
                )}{this.renderFormItem('password', 'Password', '',
                    <Input type='password' placeholder='Password' prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} />
                )}
                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={this.props.loading}>Login</Button>
                </Form.Item>
            </Form>
        );
    }

    renderFormItem(name, _, value, children) {
        return (
            <Form.Item>
                {this.props.form.getFieldDecorator(name, { initialValue: value, rules: this.formRules[name] })(children)}
            </Form.Item>
        );
    }

    onFormSubmit(e) {
        e.preventDefault();

        this.props.form.validateFields((err) => {
            if (err) return;
            else if (typeof this.props.onSubmit === 'function') {
                this.props.onSubmit();
            }
        });
    }

}

export default Form.create()(ServiceForm);