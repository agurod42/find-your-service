import { Alert, Card, Form, Layout } from 'antd';
import React from 'react';
import AuthForm from '@/components/form/auth';
import AuthService from '@/services/auth';

class AuthPage extends React.Component {

  formRef = React.createRef()

  state = {
    error: false,
    loading: false
  }

  render() {
    return (
      <Layout.Content style={{ width: 384 }}>
        <Card title='Login'>
          {this.state.error &&
            <Alert type='error' closable message='Login failed' description={this.state.error} />
          }
          <AuthForm
            ref={this.formRef}
            loading={this.state.loading}
            onSubmit={() => this.onFormSubmit()}
          />
        </Card>
      </Layout.Content>
    );
  }

  renderFormItem(name, children) {
    return this.props.form.getFieldDecorator(name, { rules: this.formRules[name] })(children);
  }

  onFormSubmit() {
    this.setState({ loading: true });

    const data = this.formRef.current.getForm().getFieldsValue();

    AuthService
      .authenticate(data.email, data.password)
      .then(() => {
        window.location.href = '/';
      })
      .catch(err => {
        this.setState({ error: err.response.data.error, loading: false });
      });
  }

}

export default Form.create()(AuthPage);