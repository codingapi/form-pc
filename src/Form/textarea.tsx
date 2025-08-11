import React from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {Input} from "antd";
import "./index.scss";
import {FormContext} from "./context";

export const FormTextArea: React.FC<FormTypeProps> = (props) => {

    const formContext = React.useContext(FormContext) || undefined;

    return (
        <Input.TextArea
            disabled={props.disabled}
            value={props.value}
            showCount={true}
            placeholder={props.placeholder}
            maxLength={props.textAreaMaxLength}
            rows={props.textAreaRows}
            onChange={(value) => {
                const currentValue = value.target.value;
                props.onChange && props.onChange(currentValue, formContext);
            }}
            {...props.itemProps}
        />
    )
}


FormTextArea.displayName = "textarea";
