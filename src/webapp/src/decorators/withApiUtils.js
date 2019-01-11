import React from 'react';
import { Redirect } from 'react-router';
import AuthService from '@/services/auth';

export const withApiUtils = () => (WrappedComponent) => {

    return class extends React.Component {
        
        apiUtils = {
            errorHandler: this.errorHandler.bind(this)
        }

        state = {
            redirect: false
        }

        errorHandler(err, next) {
            if (err.response.status === 403) {
                AuthService.deauthenticate();
                this.setState({ redirect: '/' })
            }
            else {
                next(err);
            }
        }

        render() {
            if (this.state.redirect) {
                return <Redirect to={this.state.redirect} />;
            }
            else {
                return <WrappedComponent {...this.props} apiUtils={this.apiUtils} />;
            }
        }

    }

}