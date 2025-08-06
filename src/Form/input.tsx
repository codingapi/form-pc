import React, {useContext} from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {Input} from "antd";
import "./index.scss";
import {FormContext} from "./context";

export const FormInput: React.FC<FormTypeProps> = (props) => {

    const inputType = props.inputType || "text";
    const formContext = useContext(FormContext) || undefined;

    return (
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
                props.onChange && props.onChange(currentValue, formContext);
            }}
            {...props.itemProps}
        />
    )
}

