import React from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {CodeEditor} from "../CodeEditor";
import "./index.scss";
import {FormContext} from "./context";


export const FormCode: React.FC<FormTypeProps> = (props) => {

    const formContext = React.useContext(FormContext) || undefined;

    return (
        <CodeEditor
            readonly={props.disabled}
            value={props.value}
            onChange={(value) => {
                props.onChange && props.onChange(value, formContext);
            }}
            theme={props.codeTheme}
            language={props.codeLanguage}
            fontSize={props.codeFontSize}
            style={props.codeStyle}
            actionRef={props.codeActionRef}
            onSelectedRun={props.onCodeSelectedRun}
            editorProps={props.itemProps}
        />
    )
}


FormCode.displayName = "code";
