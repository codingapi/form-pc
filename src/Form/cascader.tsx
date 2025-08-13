import React, {useContext, useEffect} from "react";
import {FormInstance, FormTypeProps} from "@codingapi/ui-framework";
import {Cascader, Space} from "antd";
import "./index.scss";
import {FormContext} from "./context";

const valueToForm = (value: string|string[]) => {
    if (value && value.length > 0) {
        if(Array.isArray(value)) {
            return value;
        }
        return value.split(",");
    }
    return value;
}

const formToValue = (value: string[]) => {
    if (value && value.length > 0) {
        return value.join(",")
    }
    return value;
}

interface $CascaderProps extends FormTypeProps{
    formInstance?:FormInstance;
}

const $Cascader:React.FC<$CascaderProps> = (props)=>{
    const formInstance = props.formInstance;
    const value = props.value?valueToForm(props.value):undefined;

    return (
       <Space.Compact
           style={{
               width:"100%"
           }}
       >
           {props.addonBefore}
           <Cascader
               disabled={props.disabled}
               value={value}
               suffixIcon={props.suffix}
               prefix={props.prefix}
               options={props.options}
               onChange={(value) => {
                   const currentValue = formToValue(value as string[]);
                   props.onChange && props.onChange(currentValue, formInstance);
               }}
               {...props.itemProps}
           />
           {props.addonAfter}
       </Space.Compact>
    )
}

export const FormCascader: React.FC<FormTypeProps> = (props) => {

    const [options, setOptions] = React.useState(props.options);

    const formContext = useContext(FormContext) || undefined;

    const reloadOptions = () => {
        if (props.loadOptions) {
            props.loadOptions(formContext).then(res => {
                setOptions(res);
            });
        }
    }

    useEffect(() => {
        reloadOptions();
    }, [props.optionVersion]);


    return (
        <$Cascader
            {...props}
            options={options}
            formInstance={formContext}
        />
    )
}

FormCascader.displayName = "cascader";

