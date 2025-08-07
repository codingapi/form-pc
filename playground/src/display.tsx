import React, { useState } from "react";
import { FormDisplay, FormFactory, FormField, NamePath } from "@codingapi/ui-framework";
import { Row, Col } from "antd";
import {Form} from "@codingapi/form-pc";

interface FormItemDisplayProps {
    display: FormDisplay;
    fields: FormField[];
}

const FormItemDisplay: React.FC<FormItemDisplayProps> = (props) => {
    const [collapsedSections, setCollapsedSections] = useState<Record<number, boolean>>({});
    const loadField = (name: NamePath) => {
        const nameKey = Array.isArray(name) ? name.join('.') : name;
        return props.fields.find(f => {
            const fieldName = Array.isArray(f.props.name) ? f.props.name.join('.') : f.props.name;
            return fieldName === nameKey;
        });
    };

    const toggleCollapse = (index: number) => {
        setCollapsedSections(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div style={styles.container}>
            {/* 页面标题 */}
            { props.display.header && (<h1 style={styles.mainTitle}>{props.display.header.title}</h1>) }

            {/* 头部信息 */}
            { props.display.header && (
                <div style={styles.headerInfo}>
                    <span>{props.display.header.left}</span>
                    <span>{props.display.header.right}</span>
                </div>
            )}

            {/* 表单内容 */}
            {props.display.body && props.display.body.map((section: any, sectionIndex: number) => {
                const isCollapsed = collapsedSections[sectionIndex];

                return (
                    <div key={sectionIndex} style={styles.section}>
                        {/* Section 标题 */}
                        {section.title && (
                            <div
                                style={styles.sectionHeader}
                                onClick={() => toggleCollapse(sectionIndex)}
                            >
                                <span style={styles.sectionTitle}>{section.title}</span>
                                <span style={{
                                    ...styles.sectionIcon,
                                    transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)'
                                }}>▼</span>
                            </div>
                        )}

                        {/* Section 内容 */}
                        <div style={{
                            ...styles.sectionContent,
                            maxHeight: isCollapsed ? '0px' : '1000px',
                            overflow: 'hidden',
                            transition: 'max-height 0.3s ease-in-out',
                            padding: isCollapsed ? '0 20px' : '20px',
                        }}>
                            <div style={styles.tableContainer}>
                                {section.list?.map((row: any[], rowIndex: number) => {
                                    const columnCount = row.length;

                                    return (
                                        <Row key={rowIndex} style={styles.tableRow} gutter={0}>
                                            {row.map((field: any, fieldIndex: number) => {
                                                const formField = loadField(field.fieldName);
                                                if (!formField) return null;

                                                const formChildren = FormFactory.getInstance().create(formField);
                                                if(formChildren) {
                                                    const newChildren = React.cloneElement(formChildren, {
                                                        itemProps: {
                                                            style: {
                                                                ...styles.tableCellValue,
                                                            }
                                                        },
                                                    });
                                                    const label = formField.props.label ;
                                                    if(formField.props.hidden){
                                                        return (
                                                            <Form.Item
                                                                key={fieldIndex}
                                                                name={field.fieldName}
                                                                required={formField.props.required}
                                                                help={formField.props.help}
                                                                tooltip={formField.props.tooltip}
                                                                hidden={formField.props.hidden}
                                                                label={label}
                                                            >
                                                                {newChildren}
                                                            </Form.Item>
                                                        )
                                                    }

                                                    // 计算Col的span，根据列数平均分配
                                                    const colSpan = 24 / columnCount;

                                                    return (
                                                        <Col key={fieldIndex}
                                                             span={colSpan}
                                                             style={styles.tableCell}>
                                                            <Form.Item
                                                                name={field.fieldName}
                                                                required={formField.props.required}
                                                                help={formField.props.help}
                                                                tooltip={formField.props.tooltip}
                                                                hidden={formField.props.hidden}
                                                                label={label}
                                                                style={styles.tableCellLabel}
                                                            >
                                                                {newChildren}
                                                            </Form.Item>
                                                        </Col>
                                                    );
                                                }
                                            })}
                                        </Row>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const styles = {
    container: {
        fontFamily: '"Microsoft YaHei", "微软雅黑", Arial, sans-serif',
        width: '100vw',
        minHeight: '100vh',
        margin: 0,
        padding: '20px',
        backgroundColor: '#fff',
        lineHeight: 1.6,
        boxSizing: 'border-box' as const,
    },
    mainTitle: {
        textAlign: 'center' as const,
        fontSize: '24px',
        fontWeight: 'bold',
        margin: '0 0 30px 0',
        color: '#333',
    },
    headerInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '30px',
        fontSize: '14px',
        color: '#666',
        paddingBottom: '15px',
        borderBottom: '1px solid #e0e0e0',
    },
    section: {
        marginBottom: '20px',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        overflow: 'hidden',
    },
    sectionHeader: {
        backgroundColor: '#4a90e2',
        color: '#fff',
        padding: '12px 20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
        userSelect: 'none' as const,
    },
    sectionIcon: {
        marginLeft: '8px',
        fontSize: '14px',
        transition: 'transform 0.3s ease',
        display: 'inline-block',
    },
    sectionTitle: {
        flex: 1,
    },
    sectionContent: {
        padding: '20px',
        backgroundColor: '#fff',
    },
    tableContainer: {
        width: '100%',
        border: '1px solid #d9d9d9',
    },
    tableRow: {
        display: 'flex',
        width: '100%',
    },
    tableCell: {
        border: '1px solid #d9d9d9',
        display: 'flex',
        flexDirection: 'row' as const,
        padding: 0,
        minHeight: '48px',
        alignItems: 'center',
    },
    tableCellLabel: {
        width: '120px',
        fontSize: '14px',
        color: '#333',
        textAlign: 'center' as const,
        backgroundColor: '#f5f5f5',
        padding: '12px 12px',
        fontWeight: '400',
        borderRight: '1px solid #d9d9d9',
        minHeight: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box' as const,
        flexShrink: 0,
    },
    tableCellValue: {
        flex: 1,
        padding: '6px 12px',
        backgroundColor: '#fff',
        minHeight: '32px',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box' as const,
    },
    requiredStar: {
        color: '#ff4d4f',
        marginRight: '4px',
    },
} as const;

export default FormItemDisplay;
