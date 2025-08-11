import React from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {Input} from "antd";
import "./index.scss";
import {FormContext} from "./context";

export const FormPassword: React.FC<FormTypeProps> = (props) => {

    const formContext = React.useContext(FormContext) || undefined;

    return (
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
                props.onChange && props.onChange(currentValue, formContext);
            }}
            {...props.itemProps}
        />
    )
}

FormPassword.displayName = "password";
