import React, {useEffect} from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {Radio, Space} from "antd";
import "./index.scss";
import {FormContext} from "./context";

export const FormRadio: React.FC<FormTypeProps> = (props) => {
    const [options, setOptions] = React.useState(props.options);
    const [value, setValue] = React.useState<string>('');

    const formContext = React.useContext(FormContext) || undefined;

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

    useEffect(() => {
        if(props.value){
            setValue(props.value);
        }
    }, [props.value]);

    return (
        <Radio.Group
            disabled={props.disabled}
            value={value}
            onChange={(value) => {
                setValue(value.target.value);
                const currentValue = value.target.value;
                props.onChange && props.onChange(currentValue, formContext);
            }}
            {...props.itemProps}
        >
            <Space direction={props.radioDirection}>
                {options?.map((item,index) => {
                    return (
                        <Radio
                            key={index}
                            value={item.value}
                            disabled={item.disable}
                        >{item.label}</Radio>
                    )
                })}
            </Space>
        </Radio.Group>
    )
}

