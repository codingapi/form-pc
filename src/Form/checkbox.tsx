import React, {useContext, useEffect} from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {Checkbox, Space} from "antd";
import "./index.scss";
import {FormContext} from "./context";

const valueToForm = (value: string) => {
    if (value && value.length > 0) {
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

export const FormCheckbox: React.FC<FormTypeProps> = (props) => {
    const [options, setOptions] = React.useState(props.options);
    const value = props.value?valueToForm(props.value):undefined;

    const formContext = useContext(FormContext)|| undefined;

    const reloadOptions = () => {
        if (props.loadOptions) {
            props.loadOptions(formContext).then(res => {
                setOptions(res);
            });
        }
    }

    useEffect(() => {
        reloadOptions();
    }, []);

    return (
        <Checkbox.Group
            disabled={props.disabled}
            value={value}
            onChange={(e) => {
                const currentValue = formToValue(e);
                props.onChange && props.onChange(currentValue, formContext)
            }}
            {...props.itemProps}
        >
            <Space direction={props.checkboxDirection}>
                {options?.map((item,index) => {
                    return (
                        <Checkbox
                            key={index}
                            disabled={item.disable}
                            value={item.value}
                        >{item.label}</Checkbox>
                    )
                })}
            </Space>
        </Checkbox.Group>
    )
}

