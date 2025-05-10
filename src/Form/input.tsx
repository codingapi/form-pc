import React, {useEffect} from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {Form, Input} from "antd";
import formFieldInit from "./common";
import "./index.scss";

export const FormInput: React.FC<FormItemProps> = (props) => {

    const inputType = props.inputType || "text";
    const {formContext} = formFieldInit(props);

    useEffect(() => {
        formContext?.addFormField(
            {
                type: 'input',
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
            <Input
                disabled={props.disabled}
                value={props.value}
                type={inputType}
                placeholder={props.placeholder}
                maxLength={props.inputMaxLength}
                addonAfter={props.addonAfter}
                addonBefore={props.addonBefore}
                onChange={(value) => {
                    const currentValue = value.target.value;
                    props.name && formContext?.setFieldValue(props.name, currentValue);
                    props.onChange && props.onChange(currentValue, formContext);
                }}
            />
        </Form.Item>
    )
}

