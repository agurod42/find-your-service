import { Modal } from 'antd';
import React from 'react';
import ServiceForm from '@/components/form/service';
import ServiceService from '@/services/service';

export default class ServiceModal extends React.Component {

    formRef = React.createRef()

    constructor(props) {
        super(props);
        if (!props.mode) throw 'ServiceModal requires a mode attribute';
    }

    render() {
        return (
            <Modal
                {...this.props}
                title={this.renderTitle()}
                onOk={() => this.onOkButtonClick()}>
                    <ServiceForm
                        ref={this.formRef} 
                    />
            </Modal>
        );
    }

    renderTitle() {
        return `${this.props.mode[0].toUpperCase()}${this.props.mode.substr(1)} Service`;
    }

    onOkButtonClick() {
        const data = this.formRef.current.getForm().getFieldsValue();
        if (this.props.mode === 'add') {
            ServiceService
                .create(data)
                .then(res => {
                    if (typeof this.props.onServiceCreated === 'function') {
                        this.props.onServiceCreated(res.data);
                    }
                });
        }
        else if (this.props.mode === 'edit') {
            ServiceService
                .update(data.id, data)
                .then(res => {
                    if (typeof this.props.onServiceUpdated === 'function') {
                        this.props.onServiceUpdated(res.data);
                    }
                });
        }
    }

}
