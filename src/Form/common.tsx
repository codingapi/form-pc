import React, {useEffect} from "react";
import {FormContext} from "./factory";
import {FormItemProps} from "@codingapi/ui-framework";

const formFieldInit = (props: FormItemProps,reloadOption?:()=>void) => {
    const formContext = React.useContext(FormContext) || undefined;
    const formAction = formContext?.getFormAction();
    const validateContext = formContext?.getFormValidateContext();
    const [random, setRandom] = React.useState(0);

    useEffect(() => {
        if (props.validateFunction) {
            if (validateContext) {
                if (props.disabled || props.hidden) {
                    // do nothing
                } else {
                    if(props.name) {
                        validateContext.addValidateFunction(props.name, props.validateFunction);
                    }
                }
            }
        }
        const reloadContext = formContext?.getFormFieldReloadListenerContext();
        if (reloadContext) {
            if(props.name) {
                reloadContext.addListener(props.name, () => {
                    setRandom(Math.random);
                });
            }
        }

        const optionContext = formContext?.getFormFieldOptionListenerContext();
        if (optionContext) {
            if(props.name) {
                optionContext.addListener(props.name, () => {
                    if (reloadOption) {
                        reloadOption();
                    }
                });
            }
        }
    }, [formContext]);

    return {formContext, validateContext};
}

export default formFieldInit;
