import React, {useEffect} from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {Form, Switch as AntSwitch, SwitchProps as AntdSwitchProps} from "antd";
import formFieldInit from "./common";
import "./index.scss";

interface SwitchProps extends AntdSwitchProps {
    value?: boolean;
}

const Switch: React.FC<SwitchProps> = ({value, ...props}) => {
    return (
        <AntSwitch
            checked={value}
            {...props}
        />
    )
}

export const FormSwitch: React.FC<FormItemProps> = (props) => {

    const {formContext} = formFieldInit(props);

    useEffect(() => {
        formContext?.addFormField(
            {
                type: 'switch',
                props: props
            }
        );
    }, []);

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
                {...props.itemProps}
            />
        </Form.Item>
    )
}

