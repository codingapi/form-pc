import React, {useContext} from "react";
import {FormInstance, FormTypeProps} from "@codingapi/ui-framework";
import {ColorPicker, Space} from "antd";
import type {AggregationColor} from "antd/es/color-picker/color";
import "./index.scss";
import {FormContext} from "./context";

const formToValue = (value: AggregationColor) => {
    if (value) {
        return value.toHexString();
    }
    return value;
}

interface $ColorPickerProps extends FormTypeProps{
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
                   props.onChange && props.onChange(currentValue, formInstance);
               }}
               {...props.itemProps}
           />
           {props.addonAfter}
       </Space.Compact>
    )
}

export const FormColor: React.FC<FormTypeProps> = (props) => {

    const formContext = useContext(FormContext) || undefined;

    return (
        <$ColorPicker
            {...props}
            formInstance={formContext}
        />
    )
}

