import {FormFactory} from "@codingapi/ui-framework";
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

export const registerDefaultFormItems = () => {
    FormFactory.getInstance().setItem('input', FormInput);
    FormFactory.getInstance().setItem('password', FormPassword);
    FormFactory.getInstance().setItem('captcha', FormCaptcha);
    FormFactory.getInstance().setItem('checkbox', FormCheckbox);
    FormFactory.getInstance().setItem('radio', FormRadio);
    FormFactory.getInstance().setItem('rate', FormRate);
    FormFactory.getInstance().setItem('slider', FormSlider);
    FormFactory.getInstance().setItem('stepper', FormStepper);
    FormFactory.getInstance().setItem('textarea', FormTextArea);
    FormFactory.getInstance().setItem('switch', FormSwitch);
    FormFactory.getInstance().setItem('date', FormDate);
    FormFactory.getInstance().setItem('cascader', FormCascader);
    FormFactory.getInstance().setItem('select', FormSelect);
    FormFactory.getInstance().setItem('selector', FormSelector);
    FormFactory.getInstance().setItem('uploader', FormUploader);
    FormFactory.getInstance().setItem('color', FormColor);
    FormFactory.getInstance().setItem('code', FormCode);
}