import { Alert, Button, Card, Form, Icon, Input, Layout } from 'antd';
import React from 'react';
import AuthService from '@/services/auth';

class AuthPage extends React.Component {

  formRules = {
    email: [{ required: true, message: 'Email is required' }],
    password: [{ required: true, message: 'Password is required' }],
  }

  state = {
    error: false
  }

  render() {
    return (
      <Layout.Content style={{ width: 384 }}>
        <Card title='Login'>
          {this.state.error &&
            <Alert type='error' closable message='Login failed' description={this.state.error} />
          }
          <Form onSubmit={(e) => this.onFormSubmit(e)}>
            <Form.Item>
              {this.renderFormItem('email', 
                <Input autoFocus type='email' placeholder='Email' prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} />
              )}
            </Form.Item>
            <Form.Item>
              {this.renderFormItem('password', 
                <Input type='password' placeholder='Password' prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} />
              )}
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Layout.Content>
    );
  }

  renderFormItem(name, children) {
    return this.props.form.getFieldDecorator(name, { rules: this.formRules[name] })(children);
  }

  onFormSubmit(e) {
    e.preventDefault();
    
    this.props.form.validateFields((err, v) => {
      if (!err) {
        AuthService
          .authenticate(v.email, v.password)
          .then(() => {
            window.location.href = '/';
          })
          .catch(err => {
            this.setState({ error: err.response.data.error });
          })
      }
    });
  }

}

export default Form.create()(AuthPage);