import React, {useContext, useEffect} from "react";
import {FormInstance, FormTypeProps} from "@codingapi/ui-framework";
import {Select, Space} from "antd";
import "./index.scss";
import {FormContext} from "./context";

const valueToForm = (value: string) => {
    if (value && value.length > 0) {
        return value.split(",");
    }
    return value;
}

const formToValue = (value: string[] |string) => {
    if(value instanceof Array) {
        if (value && value.length > 0) {
            return value.join(",")
        }
    }
    return value;
}

interface $SelectorProps extends FormTypeProps{
    formInstance?:FormInstance;
}

const $Selector: React.FC<$SelectorProps> = (props) => {
    const formInstance = props.formInstance;
    const value = valueToForm(props.value);

    return (
        <Space.Compact
            style={{
                width:"100%"
            }}
        >
            {props.addonBefore}
            <Select
                prefix={props.prefix}
                suffixIcon={props.suffix}
                disabled={props.disabled}
                value={value}
                mode={props.selectMultiple ? "multiple" : undefined}
                placeholder={props.placeholder}
                showSearch={true}
                options={props.options}
                onChange={(value,option) => {
                    const currentValue = formToValue(value);
                    props.onChange && props.onChange(currentValue, formInstance);
                }}
            />
            {props.addonAfter}
        </Space.Compact>
    )
}

export const FormSelector: React.FC<FormTypeProps> = (props) => {

    const [options, setOptions] = React.useState(props.options);

    const formContext = useContext(FormContext)|| undefined;

    const reloadOptions = () => {
        if (props.loadOptions) {
            props.loadOptions(formContext).then(list => {
                setOptions(list);
            });
        }
    }

    useEffect(() => {
        reloadOptions();
    }, []);


    return (
        <$Selector
            {...props}
            options={options}
            formInstance={formContext}
        />
    )
}

