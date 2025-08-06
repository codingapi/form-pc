import React, {useContext} from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {Rate} from "antd";
import "./index.scss";
import {FormContext} from "./context";

export const FormRate: React.FC<FormTypeProps> = (props) => {
    // const {formContext} = formFieldInit(props);
    //
    // useEffect(() => {
    //     formContext?.addFormField(
    //         {
    //             type: 'rate',
    //             props: props
    //         }
    //     );
    // }, []);

    const formContext = useContext(FormContext) || undefined;

    return (
        <Rate
            disabled={props.disabled}
            count={props.rateCount}
            allowHalf={props.rateAllowHalf}
            value={props.value}
            onChange={(value) => {
                props.onChange && props.onChange(value, formContext);
            }}
            {...props.itemProps}
        />
    )
}

