import React, {useEffect} from "react";
import {Form as AntForm} from "antd";
import {FormFactory, FormItemProps, loadRules} from "@codingapi/ui-framework";
import {formFieldInit} from "./common";


interface FormItemRenderProps extends FormItemProps{
    type: string;
}

export const FormItem:React.FC<FormItemRenderProps> = (props)=>{
    const formItem =  FormFactory.getInstance().create({
        type: props.type,
        props: {
            ...props,
        }
    }) as React.ReactElement;

    const {formContext,optionVersion} = formFieldInit(props.name);

    const children = React.cloneElement(formItem,{
        optionVersion: optionVersion,
    });

    const rules = loadRules(props);

    useEffect(() => {
        formContext?.addFormField({
            type:props.type,
            props:{
                ...props,
            }
        });
    }, []);

    return (
        <AntForm.Item
            name={props.name}
            label={props.label}
            required={props.required}
            help={props.help}
            tooltip={props.tooltip}
            hidden={props.hidden}
            rules={rules}
        >
            {children}
        </AntForm.Item>
    )
}
