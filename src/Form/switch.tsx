import React from "react";
import {FormItemProps, FormTypeProps} from "@codingapi/ui-framework";
import {Switch as AntSwitch, SwitchProps as AntdSwitchProps} from "antd";
import "./index.scss";
import {FormContext} from "./context";

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

export const FormSwitch: React.FC<FormTypeProps> = (props) => {

    const formContext = React.useContext(FormContext) || undefined;

    return (
        <Switch
            disabled={props.disabled}
            value={props.value}
            checkedChildren={props.switchCheckText}
            unCheckedChildren={props.switchUnCheckText}
            onChange={(value) => {
                props.onChange && props.onChange(value, formContext);
            }}
            {...props.itemProps}
        />
    )
}

FormSwitch.displayName = "switch";
