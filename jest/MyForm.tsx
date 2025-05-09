import {Form, FormInput} from "../src";
import {Button} from "antd";
import React from "react";

const MyForm = () => {

    const form = Form.useForm();

    return (
        <div>
            <Form
                form={form}
            >
                <FormInput name={"test"} label={"test"}/>
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
        </div>
    )
}

export default MyForm;