import React, {useEffect} from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {Radio, Space} from "antd";
import "./index.scss";
import {FormContext} from "./context";

export const FormRadio: React.FC<FormTypeProps> = (props) => {
    const [options, setOptions] = React.useState(props.options);

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

    return (
        <Radio.Group
            disabled={props.disabled}
            value={props.value}
            onChange={(value) => {
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

