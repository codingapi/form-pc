import React from "react";
import {FormDisplay, FormFactory, FormField, NamePath} from "@codingapi/ui-framework";


interface FormItemDisplayProps {
    display: FormDisplay;
    fields: FormField[];
}

const FormItemDisplay: React.FC<FormItemDisplayProps> = (props) => {
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
                const bodyTitle = item.title ;
                return (
                    <div>
                        {bodyTitle}
                        {
                            fieldList.map((list:any) => {
                                console.log('list:',list);
                                return  (
                                    <>
                                        {list.map((field:any) => {
                                            const formFiled = loadField(field.fieldName);
                                            console.log('formFiled:',formFiled);
                                            const label = formFiled?.props.label;
                                            if(formFiled) {
                                                const FormChildren = FormFactory.getInstance().create(formFiled);
                                                return (
                                                    <>
                                                        {label}: {FormChildren}
                                                    </>
                                                )
                                            }
                                        })}
                                    </>
                                )
                            })
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default FormItemDisplay;
