import React, {useEffect} from "react";
import {FormItemProps,FormInstance} from "@codingapi/ui-framework";
import {Form, Select, Space} from "antd";
import formFieldInit from "./common";
import "./index.scss";

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

interface $SelectorProps extends FormItemProps{
    formInstance?:FormInstance;
}

const $Selector: React.FC<$SelectorProps> = (props) => {
    const formInstance = props.formInstance;

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
                value={props.value}
                mode={props.selectMultiple ? "multiple" : undefined}
                placeholder={props.placeholder}
                showSearch={true}
                options={props.options}
                onChange={(value,option) => {
                    props.name && formInstance?.setFieldValue(props.name, formToValue(value as string[]));
                    props.onChange && props.onChange(value, formInstance);
                }}
            />
            {props.addonAfter}
        </Space.Compact>
    )
}

export const FormSelector: React.FC<FormItemProps> = (props) => {

    const [options, setOptions] = React.useState(props.options);

    const {formContext} = formFieldInit(props, () => {
        reloadOptions();
    });

    const reloadOptions = () => {
        if (props.loadOptions) {
            props.loadOptions(formContext).then(list => {
                setOptions(list);
            });
        }
    }

    useEffect(() => {
        formContext?.addFormField(
            {
                type: 'selector',
                props: props
            }
        );
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
            {...props.itemProps}
        >
            <$Selector
                {...props}
                options={options}
                formInstance={formContext}
            />

        </Form.Item>
    )
}

