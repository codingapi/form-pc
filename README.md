[![npm](https://img.shields.io/npm/v/@codingapi/form-pc.svg)](https://www.npmjs.com/package/@codingapi/form-pc)
# Form PC

基于PC的Form表单渲染引擎

## 安装
```
npm install @codingapi/form-pc
# 或者使用yarn
yarn add @codingapi/form-pc
```

## 使用

#### Form表单的渲染
```
import React from "react";
import {Form} from "@codingapi/form-pc";
import {FormField} from "@codingapi/ui-framework";

const Test = () => {

    const fields = [
        {
            type: 'input',
            props: {
                required: true,
                name: ['user', 'name'],
                label: '姓名',
                placeholder: '请输入姓名',
                validateFunction: async (content) => {
                    const value = content.value;
                    if (value) {
                        return []
                    }
                    return ['姓名不能为空']
                }
            }
        }] as FormField[]

    return (
        <>
            <Form
                layout={"vertical"}
                onFinish={async (values) => {
                    console.log(values);
                }}
                loadFields={async () => {
                    return fields;
                }}
            >
            </Form>
        </>
    )
}

export default Test;
```
更多示例请查看：https://github.com/codingapi/form-pc/tree/main/playground


## 主要特征

- 支持对常用的Form表单的组件渲染
- 即支持Meta数据渲染，也支持组件的渲染
- 支持对form表单的控制能力
- 支持表单字段的onChange、validate能力

## 开发

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Run tests
yarn test
```
## 许可

Apache-2.0 © [CodingAPI](https://github.com/codingapi/form-pc/blob/main/LICENSE)


