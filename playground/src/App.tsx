import React, {useEffect} from 'react';
import {Button, message, Row} from "antd";
import {Form, FormInput, FormSelect, FormSlider, FormStepper, FormTextArea} from "@codingapi/form-pc";
import {TableForm} from "@/TableForm";

const App = () => {
    const leftFormInstance = Form.useForm();

    useEffect(() => {
        leftFormInstance.setFieldsValue({
            user: '张三',
            id: '123456'
        })
    }, []);

    return (
        <>
            <Row>
                <Button
                    onClick={() => {
                        leftFormInstance.submit();
                    }}
                >submit</Button>

                <Button
                    onClick={async () => {
                        const result = await leftFormInstance.validate();
                        if (result) {
                            message.success("验证通过");
                        } else {
                            message.error("验证失败");
                        }
                    }}
                >validate</Button>

            </Row>
            <Row>
                <TableForm
                    header={{title: "基本信息"}}
                    formInstance={leftFormInstance}
                    onFinish={async (values) => {
                        message.success(JSON.stringify(values));
                    }}
                >
                    <TableForm.Item
                        label="姓名"
                        name="name"
                        required={true}
                        span={24}
                    >
                        <FormInput/>
                    </TableForm.Item>
                    <TableForm.Item
                        label="年龄"
                        name="age"
                        span={12}
                        required
                    >
                        <FormStepper/>
                    </TableForm.Item>
                    <TableForm.Item label="备注" name="remark" span={12}>
                        <FormTextArea/>
                    </TableForm.Item>
                    <TableForm.Item label="滑块" name="slider" span={12}>
                        <FormSlider/>
                    </TableForm.Item>
                    <TableForm.Item label="选择" name="select" span={12}>
                        <FormSelect
                            options={[
                                {label: '选项1', value: '1'},
                                {label: '选项2', value: '2'},
                                {label: '选项3', value: '3'}
                            ]}
                        />
                    </TableForm.Item>
                </TableForm>
            </Row>
        </>
    );
}

export default App;
