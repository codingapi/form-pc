import React from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {FormCheckbox} from "./checkbox";
import "./index.scss";

export const FormSelector: React.FC<FormItemProps> = (props) => {
    return (
        <FormCheckbox {...props} />
    )
}

