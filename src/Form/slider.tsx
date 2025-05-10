import React, {useEffect} from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {Form, Slider} from "antd";
import formFieldInit from "./common";
import "./index.scss";

export const FormSlider: React.FC<FormItemProps> = (props) => {

    const {formContext} = formFieldInit(props);

    useEffect(() => {
        formContext?.addFormField(
            {
                type: 'slider',
                props: props
            }
        );
    }, []);

    return (
        <Form.Item
            name={props.name}
            label={props.label}
            hidden={props.hidden}
            help={props.help}
            required={props.required}
            tooltip={props.tooltip}
        >
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
                    props.name && formContext?.setFieldValue(props.name, value);
                    props.onChange && props.onChange(value, formContext);
                }}
            />
        </Form.Item>
    )
}

