import React, {useEffect, useMemo} from "react";
import {FormInstance, FormItemProps} from "@codingapi/ui-framework";
import {Form, Select, Space, TreeSelect} from "antd";
import formFieldInit from "./common";
import "./index.scss";

const valueToForm = (value: string) => {
    if (value && value.length > 0) {
        return value.split(",");
    }
    return value;
}

const formToValue = (value: string[] | string) => {
    if (value instanceof Array) {
        if (value && value.length > 0) {
            return value.join(",")
        }
    }
    return value;
}

interface $SelectProps extends FormItemProps {
    formInstance?: FormInstance;
}

const SelectView: React.FC<$SelectProps> = (props) => {
    const formInstance = props.formInstance;
    return (
        <Select
            prefix={props.prefix}
            suffixIcon={props.suffix}
            disabled={props.disabled}
            value={props.value}
            mode={props.selectMultiple ? "multiple" : undefined}
            placeholder={props.placeholder}
            showSearch={true}
            options={props.options}
            onChange={(value, option) => {
                props.name && formInstance?.setFieldValue(props.name, formToValue(value as string[]));
                props.onChange && props.onChange(value, formInstance);
            }}
            {...props.itemProps}
        />
    )
}


const TreeView: React.FC<$SelectProps> = (props) => {
    return (
        <TreeSelect
            prefix={props.prefix}
            suffixIcon={props.suffix}
            disabled={!props.disabled}
            value={props.value}
            multiple={props.selectMultiple}
            placeholder={props.placeholder}
            showSearch={true}
            treeData={props.options}
            onChange={(value, option) => {
                props.name && props.formInstance?.setFieldValue(props.name, formToValue(value as string[]));
                props.onChange && props.onChange(value, props.formInstance);
            }}
            {...props.itemProps}
        />
    )
}

const $Select: React.FC<$SelectProps> = (props) => {

    const isTree = useMemo(()=>{
        if(props.options){
            const options = props.options;
            for (const option of options) {
                if (option.children && option.children.length > 0) {
                    return true;
                }
            }
        }
        return false;
    },[props.options]);

    return (
        <Space.Compact
            style={{
                width: "100%"
            }}
        >
            {props.addonBefore}
            {isTree && (
                <TreeView
                    {...props}
                />
            )}
            {!isTree && (
                <SelectView
                    {...props}
                />
            )}
            {props.addonAfter}
        </Space.Compact>
    )
}

export const FormSelect: React.FC<FormItemProps> = (props) => {

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
                type: 'select',
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
        >
            <$Select
                {...props}
                options={options}
                formInstance={formContext}
            />

        </Form.Item>
    )
}

