import React from "react";
import {FormInstance, FormRule, loadRules, NamePath} from "@codingapi/ui-framework";
import {Form} from "@codingapi/form-pc";

interface TableFormProps {
    children: React.ReactNode;
    formInstance?: FormInstance;
    onFinish?: (values: any) => Promise<void>;
    initialValues?: any;
    header?: {
        title?: string;
        left?: React.ReactNode;
        right?: React.ReactNode;
    };
}


const TableFormItem: React.FC<TableFormComponentItemProps> = (props) => {
    const rules = loadRules(props);
    return (
        <Form.Item
            name={props.name}
            required={props.required}
            style={{marginBottom: 0}}
            rules={rules}
            hidden={props.hidden}
        >
            {props.children}
        </Form.Item>
    )
}

export const TableFormComponent: React.FC<TableFormProps> = (props) => {
    const items = React.Children.toArray(props.children) as React.ReactElement<TableFormComponentItemProps>[];

    // 将 Item 按照 span 聚合成每行 24 的形式
    const rows: React.ReactElement[][] = [];
    let currentRow: React.ReactElement[] = [];
    let currentSpan = 0;

    items.forEach((item) => {
        const span = item.props.span || 24;
        if (currentSpan + span > 24) {
            rows.push(currentRow);
            currentRow = [item];
            currentSpan = span;
        } else {
            currentRow.push(item);
            currentSpan += span;
        }
    });
    if (currentRow.length > 0) {
        rows.push(currentRow);
    }

    return (
        <>
            <Form
                form={props.formInstance}
                onFinish={props.onFinish}
                initialValues={props.initialValues}
            >

                <table style={{width: '100vw', borderCollapse: 'collapse'}}>
                    <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} style={{border: '1px solid #e8e8e8'}}>
                            {row.map((item, index) => {
                                const span = item.props.span || 24;
                                const colSpan = Math.floor((span / 24) * 24 * 2); // 两个td，label+control
                                return (
                                    <React.Fragment key={index}>
                                        <td style={{
                                            width: 120,
                                            textAlign: 'right',
                                            padding: 8,
                                            whiteSpace: 'nowrap',
                                            verticalAlign: 'middle',
                                            border: '1px solid #e8e8e8'
                                        }}>
                                            {item.props.label}
                                            {item.props.required &&
                                                <span style={{color: 'red', marginLeft: 4}}>*</span>}
                                        </td>
                                        <td
                                            colSpan={colSpan - 1}
                                            style={{padding: 8, border: '1px solid #e8e8e8'}}>
                                            <TableFormItem
                                                {...item.props}
                                            />
                                        </td>
                                    </React.Fragment>
                                );
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Form>
        </>
    );
};

interface TableFormComponentItemProps {
    span?: number; // 1 ~ 24
    label?: React.ReactNode;
    name?: NamePath;
    children: React.ReactNode;
    required?: boolean;
    hidden?: boolean;
    rules?: FormRule[];
}

export const TableFormComponentItem: React.FC<TableFormComponentItemProps> = (_props) => {
    // 不实际渲染，由父组件解析 props 后统一渲染
    return null;
};

type TableFormType = typeof TableFormComponent;
type TableComponentType = TableFormType & {
    Item: typeof TableFormComponentItem;
};

export const TableForm = TableFormComponent as TableComponentType;
TableForm.Item = TableFormComponentItem;
