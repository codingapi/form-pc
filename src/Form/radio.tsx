import React, {useEffect} from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {Form, Radio, Space} from "antd";
import formFieldInit from "./common";
import "./index.scss";

export const FormRadio: React.FC<FormItemProps> = (props) => {
    const [options, setOptions] = React.useState(props.options);

    const {formContext} = formFieldInit(props, () => {
        reloadOptions();
    });

    const reloadOptions = () => {
        if (props.loadOptions) {
            props.loadOptions(formContext).then(res => {
                setOptions(res);
            });
        }
    }

    useEffect(() => {
        formContext?.addFormField(
            {
                type: 'radio',
                props: props
            }
        );
        reloadOptions();
    }, []);

    return (
        <Form.Item
            name={props.name}
            label={props.label}
            hidden={props.hidden}
            help={props.help}
            required={props.required}
            tooltip={props.tooltip}
        >
            <Radio.Group
                disabled={props.disabled}
                value={props.value}
                onChange={(value) => {
                    const currentValue = value.target.value;
                    props.name && formContext?.setFieldValue(props.name, currentValue);
                    props.onChange && props.onChange(currentValue, formContext);
                }}
            >
                <Space direction={props.radioDirection}>
                    {options?.map((item,index) => {
                        return (
                            <Radio
                                key={index}
                                value={item.value}
                                disabled={item.disable}
                            >{item.label}</Radio>
                        )
                    })}
                </Space>
            </Radio.Group>
        </Form.Item>
    )
}

