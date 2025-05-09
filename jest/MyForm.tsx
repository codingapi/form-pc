import {Form, FormInput} from "../src";
import {Button} from "antd";
import React from "react";
import {ValidateUtils} from "@codingapi/ui-framework";

const MyForm = () => {

    const form = Form.useForm();

    return (
        <div>
            <Form
                form={form}
                onFinish={async (values)=>{
                    console.log(values);
                }}
            >
                <FormInput
                    name={"test"}
                    label={"test"}
                    validateFunction={ValidateUtils.validateNotEmpty}
                />
            </Form>

            <Button
                role={"button"}
                aria-label={"getValue"}
                onClick={() => {
                    const value = form.getFieldValue('test');
                    console.log(value);
                }}
            >get value</Button>

            <Button
                role={"button"}
                aria-label={"setValue"}
                onClick={() => {
                    form.setFieldValue('test', 'test');
                }}
            >set value</Button>


            <Button
                role={"button"}
                aria-label={"validate"}
                onClick={async () => {
                    const result = await form.validate();
                    console.log(result ? "true" : "false");
                }}
            >validate</Button>


            <Button
                role={"button"}
                aria-label={"getTest"}
                onClick={() => {
                    const field = form.getFieldProps('test');
                    console.log(field);
                }}
            >getTest</Button>


            <Button
                role={"button"}
                aria-label={"submit"}
                onClick={async () => {
                    await form.submit();
                }}
            >submit</Button>
        </div>
    )
}

export default MyForm;