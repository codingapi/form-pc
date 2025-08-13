import React, {useContext, useEffect, useMemo} from "react";
import {FormInstance, FormTypeProps} from "@codingapi/ui-framework";
import {Select, Space, TreeSelect} from "antd";
import "./index.scss";
import {FormContext} from "./context";

const valueToForm = (value: string | string[]) => {
    if (value instanceof Array) {
        return value;
    }
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

interface $SelectProps extends FormTypeProps {
    formInstance?: FormInstance;
}

const SelectView: React.FC<$SelectProps> = (props) => {
    const formInstance = props.formInstance;
    const value = valueToForm(props.value);

    return (
        <Select
            prefix={props.prefix}
            suffixIcon={props.suffix}
            disabled={props.disabled}
            value={value}
            mode={props.selectMultiple ? "multiple" : undefined}
            placeholder={props.placeholder}
            showSearch={true}
            options={props.options}
            onChange={(value, option) => {
                const currentValue = formToValue(value);
                props.onChange && props.onChange(currentValue, formInstance);
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
            disabled={props.disabled}
            value={props.value}
            multiple={props.selectMultiple}
            placeholder={props.placeholder}
            showSearch={true}
            treeData={props.options}
            onChange={(value, option) => {
                const currentValue = formToValue(value);
                props.onChange && props.onChange(currentValue, props.formInstance);
            }}
            {...props.itemProps}
        />
    )
}

const $Select: React.FC<$SelectProps> = (props) => {

    const isTree = useMemo(() => {
        if (props.options) {
            const options = props.options;
            for (const option of options) {
                if (option.children && option.children.length > 0) {
                    return true;
                }
            }
        }
        return false;
    }, [props.options]);

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

export const FormSelect: React.FC<FormTypeProps> = (props) => {

    const [options, setOptions] = React.useState(props.options);

    const formContext = useContext(FormContext) || undefined;

    const reloadOptions = () => {
        if (props.loadOptions) {
            props.loadOptions(formContext).then(list => {
                setOptions(list);
            });
        }
    }

    useEffect(() => {
        reloadOptions();
    }, [props.optionVersion]);

    return (
        <$Select
            options={options}
            formInstance={formContext}
            {...props}
        />
    )
}

FormSelect.displayName = "select";
