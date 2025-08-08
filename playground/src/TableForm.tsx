import React from "react";
import {FormInstance, NamePath} from "@codingapi/ui-framework";
import {Form} from "@codingapi/form-pc";

interface TableFormProps {
    children: React.ReactNode;
    formInstance?: FormInstance;
    onFinish?: (values: any) => Promise<void>;
    initialValues?: any;
    header?:{
        title?: string;
        left?: React.ReactNode;
        right?: React.ReactNode;
    }
}

export const TableFormComponent: React.FC<TableFormProps> = (props) => {

    return (
        <>
            {props.header && (
                <div className="table-form-header">
                    {props.header.title && <h3>{props.header.title}</h3>}
                    <div className="table-form-header-actions">
                        {props.header.left}
                        {props.header.right}
                    </div>
                </div>
            )}
            <Form
                form={props.formInstance}
                onFinish={props.onFinish}
                initialValues={props.initialValues}
            >
                {props.children}
            </Form>
        </>
    )
}

interface TableFormComponentItemProps{
    span?: number;
    label?: React.ReactNode;
    name?: NamePath;
    children?: React.ReactNode;
    required?: boolean;
}

export const TableFormComponentItem:React.FC<TableFormComponentItemProps> = (props)=>{
    return (
        <Form.Item
            name={props.name}
            label={props.label}
            required={props.required}
            labelCol={{
                style:{
                    width: '100px',
                }
            }}
        >
            {props.children}
        </Form.Item>
    )
}


type TableFormType = typeof TableFormComponent;
type TableComponentType = TableFormType & {
    Item: typeof TableFormComponentItem;
};

export const TableForm = TableFormComponent as TableComponentType;
TableForm.Item = TableFormComponentItem;
