import React, {useContext, useEffect} from "react";
import {
    AntdForm,
    AntdFormInstance,
    FormFactory,
    FormField,
    FormInstance,
    FormProps, ThemeConfig,
    ThemeProvider, ThemeProviderContext
} from "@codingapi/ui-framework";
import {ConfigProvider, Form as AntForm} from "antd";
import {FormContext} from "./context";
import "./index.scss";
import {registerDefaultFormItems} from "./register";


const FormComponent: React.FC<FormProps> = (props) => {
    registerDefaultFormItems();
    props.registerFormItems && props.registerFormItems();

    const formInstance = props.form ? props.form : new FormInstance();
    const themeContext = useContext(ThemeProviderContext);

    const theme = themeContext?.getTheme() || {} as ThemeConfig;

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
        <ThemeProvider theme={theme}>
            <FormContext.Provider
                value={formInstance}
            >
                <ConfigProvider theme={theme}>
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
                </ConfigProvider>
            </FormContext.Provider>
        </ThemeProvider>
    )
}

type FormType = typeof FormComponent;
type FormComponentType = FormType & {
    useForm: () => FormInstance;
};

export const Form = FormComponent as FormComponentType;
Form.useForm = () => {
    AntdForm.getInstance().registerForm({
        useForm(): AntdFormInstance {
            const [formInstance] = AntForm.useForm();
            return formInstance;
        }
    })
    return new FormInstance();
};
