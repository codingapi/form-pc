import React from "react";
import {FormDisplay, FormField} from "@codingapi/ui-framework";


interface FormItemDisplayProps{
    display:FormDisplay;
    fields:FormField[];
}

const FormItemDisplay: React.FC<FormItemDisplayProps> = (props) => {

    return (
        <div>
            display
        </div>
    )
}

export default FormItemDisplay;
