import React from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {InputNumber} from "antd";
import "./index.scss";
import {FormContext} from "./context";

export const FormStepper: React.FC<FormTypeProps> = (props) => {

    const formContext = React.useContext(FormContext) || undefined;

    return (
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
                props.onChange && props.onChange(value, formContext);
            }}
            {...props.itemProps}
        />
    )
}

