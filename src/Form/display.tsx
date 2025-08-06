import React from "react";
import {FormDisplay, FormFactory, FormField, NamePath} from "@codingapi/ui-framework";


interface FormDisplayRenderProps {
    display: FormDisplay;
    fields: FormField[];
}

const FormDisplayRender: React.FC<FormDisplayRenderProps> = (props) => {
    const loadField = (name: NamePath) => {
        const nameKey = Array.isArray(name) ? name.join('.') : name;
        return props.fields.find(f => {
            const fieldName = Array.isArray(f.props.name) ? f.props.name.join('.') : f.props.name;
            return fieldName === nameKey;
        });
    }


    return (
        <div>
            {props.display.body.map((item, i) => {
                const fieldList = item.list || [];
                return fieldList.map((field) => {
                    if (field.fieldName) {
                        const formFiled = loadField(field.fieldName);
                        const label = formFiled?.props.label;
                        if(formFiled) {
                            const FormChildren = FormFactory.getInstance().create(formFiled);
                            return (
                                <>
                                    {label}: {FormChildren}
                                </>
                            )
                        }
                    }
                })
            })}
        </div>
    )
}

export default FormDisplayRender;
