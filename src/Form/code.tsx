import React from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {Form} from "antd";
import formFieldInit from "./common";
import {CodeEditor} from "../CodeEditor";
import "./index.scss";


export const FormCode: React.FC<FormItemProps> = (props) => {

    const {formContext} = formFieldInit(props);

    return (
        <Form.Item
            name={props.name}
            label={props.label}
            hidden={props.hidden}
            help={props.help}
            required={props.required}
            tooltip={props.tooltip}
        >
            <CodeEditor
                readonly={props.disabled}
                value={props.value}
                onChange={(value) => {
                    props.name && formContext?.setFieldValue(props.name, value);
                    props.onChange && props.onChange(value, formContext);
                }}
                theme={props.codeTheme}
                language={props.codeLanguage}
                fontSize={props.codeFontSize}
                style={props.codeStyle}
                actionRef={props.codeActionRef}
                onSelectedRun={props.onCodeSelectedRun}
            />
        </Form.Item>
    )
}

