import React, {useEffect} from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {Checkbox, Form, Space} from "antd";
import formFieldInit from "./common";
import "./index.scss";

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

export const FormCheckbox: React.FC<FormItemProps> = (props) => {
    const [options, setOptions] = React.useState(props.options);

    const {formContext} = formFieldInit(props, () => {
        reloadOptions();
    });

    const reloadOptions = () => {
        if (props.loadOptions) {
            props.loadOptions(formContext).then(res => {
                setOptions(res);
            });
        }
    }

    useEffect(() => {
        formContext?.addFormField({
            type: "checkbox",
            props: props
        });
        reloadOptions();
    }, []);

    return (
        <Form.Item
            name={props.name}
            label={props.label}
            required={props.required}
            hidden={props.hidden}
            help={props.help}
            tooltip={props.tooltip}
            getValueProps={(value) => {
                if (value) {
                    return {
                        value: valueToForm(value)
                    }
                }
                return value
            }}
        >
            <Checkbox.Group
                disabled={props.disabled}
                value={props.value}
                onChange={(e) => {
                    props.name && formContext?.setFieldValue(props.name, formToValue(e as string[]));
                    props.onChange && props.onChange(e, formContext)
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
        </Form.Item>
    )
}

