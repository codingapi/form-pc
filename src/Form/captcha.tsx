import React, {useContext, useEffect, useState} from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {Input} from "antd";
import "./index.scss";
import {FormContext} from "./context";


export const FormCaptcha: React.FC<FormTypeProps> = (props) => {

    const [captchaImg, setCaptchaImg] = useState<string>('');
    const formContext = useContext(FormContext) || undefined;

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
    }, [props.optionVersion]);

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
                    props.onChange && props.onChange(currentValue, formContext);
                }}
                {...props.itemProps}
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

FormCaptcha.displayName = "captcha";

