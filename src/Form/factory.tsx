import React from "react";
import {FormField} from "@codingapi/ui-framework";
import {FormInput} from "./input";
import {FormPassword} from "./password";
import {FormCaptcha} from "./captcha";
import {FormCheckbox} from "./checkbox";
import {FormRadio} from "./radio";
import {FormRate} from "./rate";
import {FormSlider} from "./slider";
import {FormStepper} from "./stepper";
import {FormTextArea} from "./textarea";
import {FormSwitch} from "./switch";
import {FormDate} from "./date";
import {FormCascader} from "./cascader";
import {FormSelect} from "./select";
import {FormSelector} from "./selector";
import {FormUploader} from "./uploder";
import {FormColor} from "./color";
import {FormCode} from "./code";


export class FormFactory {

    static create = (field: FormField) => {
        const type = field.type;
        const props = field.props;

        if (type === 'input') {
            return (
                <FormInput
                    {...props}
                    key={props.name as string}
                />
            )
        }

        if (type === 'password') {
            return (
                <FormPassword
                    {...props}
                    key={props.name as string}
                />
            )
        }

        if (type === 'captcha') {
            return (
                <FormCaptcha
                    {...props}
                    key={props.name as string}
                />
            )
        }

        if (type === 'checkbox') {
            return (
                <FormCheckbox
                    {...props}
                    key={props.name as string}
                />
            )
        }

        if (type === 'radio') {
            return (
                <FormRadio
                    {...props}
                    key={props.name as string}
                />
            )
        }

        if (type === 'rate') {
            return (
                <FormRate
                    {...props}
                    key={props.name as string}
                />
            )
        }

        if (type === 'slider') {
            return (
                <FormSlider
                    {...props}
                    key={props.name as string}
                />
            )
        }
        if (type === 'stepper') {
            return (
                <FormStepper
                    {...props}
                    key={props.name as string}
                />
            )
        }

        if (type === 'textarea') {
            return (
                <FormTextArea
                    {...props}
                    key={props.name as string}
                />
            )
        }

        if (type === 'switch') {
            return (
                <FormSwitch
                    {...props}
                    key={props.name as string}
                />
            )
        }

        if (type === 'date') {
            return (
                <FormDate
                    {...props}
                    key={props.name as string}
                />
            )
        }

        if (type === 'cascader') {
            return (
                <FormCascader
                    {...props}
                    key={props.name as string}
                />
            )
        }

        if (type === 'selector') {
            return (
                <FormSelector
                    {...props}
                    key={props.name as string}
                />
            )
        }

        if (type === 'select') {
            return (
                <FormSelect
                    {...props}
                    key={props.name as string}
                />
            )
        }

        if (type === 'uploader') {
            return (
                <FormUploader
                    {...props}
                    key={props.name as string}
                />
            )
        }

        if (type === 'color') {
            return (
                <FormColor
                    {...props}
                    key={props.name as string}
                />
            )
        }

        if (type === 'code') {
            return (
                <FormCode
                    {...props}
                    key={props.name as string}
                />
            )
        }
    }

}

