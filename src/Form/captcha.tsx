import React, {useEffect, useState} from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {Form, Input} from "antd";
import formFieldInit from "./common";
import "./index.scss";


const Captcha: React.FC<FormItemProps> = (props) => {

    const [captchaImg, setCaptchaImg] = useState<string>('');
    const {formContext} = formFieldInit(props);

    const reloadCaptcha = () => {
        props.onCaptchaRefresh && props.onCaptchaRefresh().then((res) => {
            if (res) {
                setCaptchaImg(res.url);
                props.onCaptchaChange && props.onCaptchaChange(res.code);
            }
        });
    }

    useEffect(() => {
        reloadCaptcha();
    }, [])

    return (
        <div className={"form-captcha"}>
            <Input
                className={"form-captcha-input"}
                disabled={props.disabled}
                value={props.value}
                addonAfter={props.addonAfter}
                addonBefore={props.addonBefore}
                prefix={props.prefix}
                suffix={props.suffix}
                placeholder={props.placeholder}
                onChange={(e) => {
                    const currentValue = e.target.value;
                    props.name && formContext?.setFieldValue(props.name, currentValue);
                    props.onChange && props.onChange(currentValue, formContext);
                }}
            />

            <img
                className={"form-captcha-img"}
                onClick={() => {
                    reloadCaptcha();
                }}
                src={captchaImg}
                alt="点击重置"
            />
        </div>
    )
}


export const FormCaptcha: React.FC<FormItemProps> = (props) => {
    const {formContext} = formFieldInit(props);

    useEffect(() => {
        formContext?.addFormField(
            {
                type: 'captcha',
                props: props
            }
        );
    }, []);


    return (
        <Form.Item
            name={props.name}
            label={props.label}
            required={props.required}
            hidden={props.hidden}
            help={props.help}
            tooltip={props.tooltip}
        >
            <Captcha
                {...props}
            />
        </Form.Item>
    )
}

