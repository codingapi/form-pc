import React, {useContext, useEffect} from "react";
import {
    AntdForm,
    AntdFormInstance,
    FormField,
    FormInstance,
    FormProps,
    FormRule,
    NamePath,
    ThemeConfig,
    ThemeProvider,
    ThemeProviderContext
} from "@codingapi/ui-framework";
import {ConfigProvider, Form as AntForm} from "antd";
import {FormContext} from "./context";
import "./index.scss";
import {FormItem} from "./item";
import FormDisplayRender from "./display";
import {registerDefaultFormItems} from "./register";
import {formFieldInit} from "./common";

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
                        {fields.length > 0 && !props.display && fields.map((field) => {
                            const itemRenderProps = {
                                type: field.type,
                                ...field.props,
                            }
                            return (
                                <FormItem {...itemRenderProps} />
                            )
                        })}

                        {fields.length > 0 && props.display && (
                            <FormDisplayRender display={props.display} fields={fields}/>
                        )}

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
    Item: typeof $FormItem;
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

interface $FormItemProps {
    children: React.ReactNode;
    name?: NamePath;
    hidden?: boolean;
    label?: React.ReactNode;
    required?: boolean;
    tooltip?: React.ReactNode;
    style?: React.CSSProperties;
    rules?: FormRule[];
}

const $FormItem: React.FC<$FormItemProps> = (props) => {

    const child = props.children;
    if (React.isValidElement(child)) {
        // @ts-ignore
        const type = child.type.displayName;

        const {formContext} = formFieldInit(props.name);

        useEffect(() => {
            formContext?.addFormField({
                type: type,
                props: {
                    ...child.props,
                    ...props,
                }
            })
        }, []);
    }

    return (
        <AntForm.Item
            name={props.name}
            hidden={props.hidden}
            label={props.label}
            required={props.required}
            tooltip={props.tooltip}
            style={props.style}
            rules={props.rules}
        >
            {props.children}
        </AntForm.Item>
    )
}

Form.Item = $FormItem;
