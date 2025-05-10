import React, {useEffect} from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {Form, Input} from "antd";
import formFieldInit from "./common";
import "./index.scss";

export const FormPassword: React.FC<FormItemProps> = (props) => {

    const {formContext} = formFieldInit(props);

    useEffect(() => {
        formContext?.addFormField(
            {
                type: 'password',
                props: props
            }
        );
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
            <Input.Password
                disabled={props.disabled}
                value={props.value}
                addonAfter={props.addonAfter}
                addonBefore={props.addonBefore}
                prefix={props.prefix}
                suffix={props.suffix}
                placeholder={props.placeholder}
                onChange={(value) => {
                    const currentValue = value.target.value;
                    props.name && formContext?.setFieldValue(props.name, currentValue);
                    props.onChange && props.onChange(currentValue, formContext);
                }}
            />
        </Form.Item>
    )
}

