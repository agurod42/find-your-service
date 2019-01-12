import { Dropdown, Form, Icon, Input, Menu } from 'antd';
import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class ServiceForm extends React.Component {

    formRules = {
        email: [{ required: true, message: 'Email is required' }],
        password: [{ required: true, message: 'Password is required' }],
    }

    state = {
        addressLoading: false
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
                    <PlacesAutocomplete
                        value={this.props.data.address || ''}
                        onChange={() => this.onAddressChange()}
                        onSelect={e => this.onAddressSelect(e)}>
                            {({ loading, suggestions, getInputProps, getSuggestionItemProps }) => (
                                <Dropdown overlay={this.renderAddressSuggestionsMenu(suggestions, getSuggestionItemProps)}>
                                    <Input {...getInputProps({ type: 'text', autoFocus: true, placeholder: '51 Sycamore Street', suffix: loading ? <Icon type='loading' /> : undefined })} />
                                </Dropdown>
                            )}
                    </PlacesAutocomplete>
                )}
                {this.renderFormItem('city', 'City', this.props.data.city,
                    <Input readOnly type='text' placeholder='New York' suffix={this.state.addressLoading ? <Icon type='loading' /> : undefined} />
                )}
                {this.renderFormItem('state', 'State', this.props.data.state,
                    <Input readOnly type='text' placeholder='NY' suffix={this.state.addressLoading ? <Icon type='loading' /> : undefined} />
                )}
                {this.renderFormItem('zip_code', 'ZIP Code', this.props.data.zip_code,
                    <Input readOnly type='text' placeholder='10025' suffix={this.state.addressLoading ? <Icon type='loading' /> : undefined} />
                )}
                {this.renderFormItem('location_lat', 'Latitude', this.props.data.location_lat,
                    <Input readOnly type='text' placeholder='40.7998309' suffix={this.state.addressLoading ? <Icon type='loading' /> : undefined} />
                )}
                {this.renderFormItem('location_lon', 'Longitude', this.props.data.location_lon,
                    <Input readOnly type='text' placeholder='-73.9703027' suffix={this.state.addressLoading ? <Icon type='loading' /> : undefined} />
                )}
            </Form>
        );
    }

    renderAddressSuggestionsMenu(suggestions, getSuggestionItemProps) {
        return (
            <Menu>
                {suggestions.map(suggestion => (
                    <Menu.Item {...getSuggestionItemProps(suggestion)}>
                        {suggestion.description}
                    </Menu.Item>
                ))}
            </Menu>
        );
    }

    renderFormItem(name, label, value, children) {
        return (
            <Form.Item label={label} labelCol={{ xs: { span: 24, span: 6 } }} wrapperCol={{ xs: { span: 24, span: 18 } }}>
                {this.props.form.getFieldDecorator(name, { initialValue: value, rules: this.formRules[name] })(children)}
            </Form.Item>
        );
    }

    onAddressChange() {
        this.props.form.setFieldsValue({ state: '', city: '', zip_code: '', location_lat: '', location_lon: '' });
    }

    async onAddressSelect(address) {
        this.setState({ addressLoading: true });

        const geocode = await geocodeByAddress(address);
        const location = await getLatLng(geocode[0]);

        let values = { 
            address: address,
            location_lat: location.lat,
            location_lon: location.lng
        };
                
        geocode[0].address_components.forEach(addressComponent => {
            const fieldMap = {
                state: 'administrative_area_level_1',
                city: 'locality',
                zip_code: 'postal_code'
            };
            for (var i in fieldMap) {
                if (addressComponent.types.indexOf(fieldMap[i]) >= 0) {
                    values[i] = addressComponent.long_name;
                }
            }
        });

        this.props.form.setFieldsValue(values);
        this.setState({ addressLoading: false });
    }

}

export default Form.create()(ServiceForm);