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
                destroyOnClose
                title={this.renderTitle()}
                onOk={() => this.onOkButtonClick()}>
                    <ServiceForm
                        data={this.props.data}
                        ref={this.formRef} 
                    />
            </Modal>
        );
    }

    renderTitle() {
        return `${this.props.mode[0].toUpperCase()}${this.props.mode.substr(1)} Service`;
    }

    onOkButtonClick(e) {
        if (typeof this.props.onOk === 'function') {
            const data = this.formRef.current.getForm().getFieldsValue();
            this.props.onOk(e, data);
        }
    }

}
