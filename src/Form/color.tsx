import React from "react";
import {FormItemProps,FormInstance} from "@codingapi/ui-framework";
import {ColorPicker, Form, Space} from "antd";
import formFieldInit from "./common";
import "./index.css";
import type {AggregationColor} from "antd/es/color-picker/color";

const formToValue = (value: AggregationColor) => {
    if (value) {
        return value.toHexString();
    }
    return value;
}

interface $ColorPickerProps extends FormItemProps{
    formInstance?:FormInstance;
}

const $ColorPicker:React.FC<$ColorPickerProps> = (props)=>{
    const formInstance = props.formInstance;

    return (
       <Space.Compact
           style={{
               width:"100%"
           }}
       >
           {props.addonBefore}
           <ColorPicker
               disabled={props.disabled}
               value={props.value}
               onChange={(value) => {
                   const currentValue = formToValue(value);
                   props.name && formInstance?.setFieldValue(props.name, currentValue);
                   props.onChange && props.onChange(currentValue, formInstance);
               }}
           />
           {props.addonAfter}
       </Space.Compact>
    )
}

export const FormColor: React.FC<FormItemProps> = (props) => {

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
            <$ColorPicker
                {...props}
                formInstance={formContext}
            />

        </Form.Item>
    )
}

