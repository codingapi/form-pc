import React from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {Form, Switch as AntSwitch, SwitchProps as AntdSwitchProps} from "antd";
import formFieldInit from "./common";
import "./index.css";

interface SwitchProps extends AntdSwitchProps {
    value?: boolean;
}

const Switch: React.FC<SwitchProps> = ({value, ...props}) => {
    return (
        <AntSwitch checked={value} {...props}/>
    )
}

export const FormSwitch: React.FC<FormItemProps> = (props) => {

    const {formContext} = formFieldInit(props);

    return (
        <Form.Item
            name={props.name}
            label={props.label}
            hidden={props.hidden}
            required={props.required}
            help={props.help}
            tooltip={props.tooltip}
        >
            <Switch
                disabled={props.disabled}
                value={props.value}
                checkedChildren={props.switchCheckText}
                unCheckedChildren={props.switchUnCheckText}
                onChange={(value) => {
                    props.name && formContext?.setFieldValue(props.name, value);
                    props.onChange && props.onChange(value, formContext);
                }}
            />
        </Form.Item>
    )
}

