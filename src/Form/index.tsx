import React, {useEffect} from "react";
import {FormField, FormInstance, AntdForm, AntdFormInstance,FormFactory,FormProps} from "@codingapi/ui-framework";
import {Form as AntForm} from "antd";
import {FormContext} from "./context";
import "./index.scss";
import {registerDefaultFormItems} from "./register";


const FormComponent: React.FC<FormProps> = (props) => {
    registerDefaultFormItems();
    props.registerFormItems && props.registerFormItems();

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
                    return FormFactory.getInstance().create(field) as React.ReactNode;
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
