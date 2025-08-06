import React, {useEffect} from "react";
import {Form as AntForm} from "antd";
import {FormFactory, FormField} from "@codingapi/ui-framework";
import formFieldInit from "./common";

export const FormItem:React.FC<FormField> = (props)=>{
    const formItem =  FormFactory.getInstance().create(props) as React.ReactNode;
    const {formContext} = formFieldInit(props.props);

    useEffect(() => {
        formContext?.addFormField(props);
    }, []);

    return (
        <AntForm.Item
            name={props.props.name}
            label={props.props.label}
            required={props.props.required}
            help={props.props.help}
            tooltip={props.props.tooltip}
            hidden={props.props.hidden}
        >
            {formItem}
        </AntForm.Item>
    )
}
