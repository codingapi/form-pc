import React, {useEffect} from "react";
import {FormField, FormInstance, AntdForm, AntdFormInstance} from "@codingapi/ui-framework";
import {Form as AntForm} from "antd";
import {FormFactory,FormContext} from "./factory";
import "./index.css";

export interface FormProps {
    // 表单字段
    loadFields?: () => Promise<FormField[]>;
    // 表单提交事件
    onFinish?: (values: any) => Promise<void>;
    // form布局，默认vertical
    layout?: 'horizontal' | 'vertical';
    // children元素
    children?: React.ReactNode;
    // footer元素
    footer?: React.ReactNode;
    // 初始化值
    initialValues?: any;
    // 表单实例
    form?: FormInstance;
}

const FormComponent: React.FC<FormProps> = (props) => {

    const formInstance = props.form? props.form : new FormInstance();

    const [fields, setFields] = React.useState<FormField[]>([]);
    formInstance.setFieldsUpdateDispatch(setFields);

    const formControl = formInstance.getFormControlInstance() as any;

    const reloadFields = () => {
        if (props.loadFields) {
            props.loadFields().then(fields => {
                setFields(fields);
                formInstance.resetFields(fields);
            })
        }
    }

    useEffect(() => {
        reloadFields();
    }, [props.loadFields]);

    return (
        <FormContext.Provider
            value={formInstance}
        >
            <AntForm
                form={formControl}
                onFinish={(values) => {
                    props.onFinish && props.onFinish(values);
                }}
                initialValues={props.initialValues}
                layout={props.layout}
            >
                {fields.length > 0 && fields.map((field) => {
                    return FormFactory.create(field) as React.ReactNode;
                })}

                {props.children}

                {props.footer}
            </AntForm>
        </FormContext.Provider>
    )
}

type FormType = typeof FormComponent;
type FormComponentType = FormType & {
    useForm: ()=>FormInstance;
};

export const Form = FormComponent as FormComponentType;
Form.useForm = ()=>{
    AntdForm.getInstance().registerForm({
        useForm(): AntdFormInstance {
            const [formInstance] = AntForm.useForm();
            return formInstance;
        }
    })
    return new FormInstance();
};
