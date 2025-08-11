import React from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {Slider} from "antd";
import "./index.scss";
import {FormContext} from "./context";

export const FormSlider: React.FC<FormTypeProps> = (props) => {

    const formContext = React.useContext(FormContext) || undefined;

    return (
        <Slider
            disabled={props.disabled}
            value={props.value}
            max={props.sliderMaxNumber}
            min={props.sliderMinNumber}
            step={props.sliderStep}
            range={props.sliderRange}
            tooltip={props.sliderPopover && {
                open: true,
                placement: 'top',
                getPopupContainer: () => {
                    return document.getElementById('root') as HTMLElement;
                }
            } || {
                open: false
            }}
            marks={props.sliderMarks}
            onChange={(value:any) => {
                props.onChange && props.onChange(value, formContext);
            }}
            {...props.itemProps}
        />
    )
}

FormSlider.displayName = "slider";
