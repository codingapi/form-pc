import React from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {Form, InputNumber} from "antd";
import formFieldInit from "./common";
import "./index.scss";

export const FormStepper: React.FC<FormItemProps> = (props) => {

    const {formContext} = formFieldInit(props);

    return (
        <Form.Item
            name={props.name}
            label={props.label}
            hidden={props.hidden}
            help={props.help}
            required={props.required}
            tooltip={props.tooltip}
        >
            <InputNumber
                style={{
                    width:"100%"
                }}
                addonBefore={props.addonBefore}
                addonAfter={props.addonAfter}
                prefix={props.prefix}
                suffix={props.suffix}
                disabled={props.disabled}
                value={props.value}
                max={props.stepperMaxNumber}
                min={props.stepperMinNumber}
                step={props.stepperDecimalLength}
                onChange={(value) => {
                    props.name && formContext?.setFieldValue(props.name, value);
                    props.onChange && props.onChange(value, formContext);
                }}
            />
        </Form.Item>
    )
}

