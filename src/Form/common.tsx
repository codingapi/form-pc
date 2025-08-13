import React, {useEffect} from "react";
import {NamePath} from "@codingapi/ui-framework";
import {FormContext} from "./context";

export const formFieldInit = (formName?: NamePath) => {
    const formContext = React.useContext(FormContext) || undefined;
    const [random, setRandom] = React.useState(0);
    const [optionVersion, setOptionVersion] = React.useState(0);

    useEffect(() => {
        const reloadContext = formContext?.getFormFieldReloadListenerContext();
        if (reloadContext) {
            if (formName) {
                reloadContext.addListener(formName, () => {
                    setRandom(Math.random);
                });
            }
        }

        const optionContext = formContext?.getFormFieldOptionListenerContext();
        if (optionContext) {
            if (formName) {
                optionContext.addListener(formName, () => {
                    setOptionVersion(Math.random());
                });
            }
        }
    }, [formContext]);

    return {formContext,optionVersion};
}
