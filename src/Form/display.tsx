import React, {useEffect, useState} from "react";
import {FormDisplay, FormFactory, FormField, NamePath} from "@codingapi/ui-framework";
import {Col, Form as AntForm, Row} from "antd";
import {formFieldInit} from "./common";

interface FormDisplayRenderProps {
    display: FormDisplay;
    fields: FormField[];
}

interface FormItemRenderProps{
    field: FormField;
    children: React.ReactNode;
}

const FormItemRender:React.FC<FormItemRenderProps> = (props)=>{

    const {formContext} = formFieldInit(props.field.props.name);

    useEffect(() => {
        formContext?.addFormField(props.field);
    }, []);

    return (
        <div style={styles.formItemContainer}>
            <AntForm.Item
                name={props.field.props.name}
                rules={props.field.props.required ? [{ required: true, message: `请输入${props.field.props.label}` }] : []}
                help={props.field.props.help}
                tooltip={props.field.props.tooltip}
                style={{
                    margin: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                {props.children}
            </AntForm.Item>
        </div>
    )
}

const FormDisplayRender: React.FC<FormDisplayRenderProps> = (props) => {
    const [collapsedSections, setCollapsedSections] = useState<Record<number, boolean>>({});
    const [hiddenErrors, setHiddenErrors] = useState<Record<string, boolean>>({});
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

    const handleFieldError = (fieldName: string) => {
        // 2秒后隐藏错误信息
        setTimeout(() => {
            setHiddenErrors(prev => ({
                ...prev,
                [fieldName]: true
            }));
        }, 2000);
    };

    // 当字段值改变时，重置隐藏状态
    const resetFieldError = (fieldName: string) => {
        setHiddenErrors(prev => ({
            ...prev,
            [fieldName]: false
        }));
    };

    // 监听DOM变化，自动处理验证信息显示
    useEffect(() => {
        const handleErrorMessages = () => {
            const errorElements = document.querySelectorAll('.ant-form-item-explain-error:not(.auto-hide-processed)');
            // console.log('Found error elements:', errorElements.length);

            errorElements.forEach((element) => {
                // console.log('Processing error element:', element.textContent);
                element.classList.add('auto-hide-processed');

                // 1秒后添加隐藏类
                setTimeout(() => {
                    console.log('Hiding error element:', element.textContent);
                    element.classList.add('error-hidden');

                    // 立即设置样式确保完全隐藏
                    const htmlElement = element as HTMLElement;
                    htmlElement.style.height = '0px';
                    htmlElement.style.minHeight = '0px';
                    htmlElement.style.maxHeight = '0px';
                    htmlElement.style.padding = '0px';
                    htmlElement.style.margin = '0px';
                    htmlElement.style.border = 'none';
                    htmlElement.style.background = 'transparent';
                    htmlElement.style.boxShadow = 'none';
                    htmlElement.style.overflow = 'hidden';
                    htmlElement.style.lineHeight = '0';
                    htmlElement.style.fontSize = '0px';
                    htmlElement.style.opacity = '0';
                    htmlElement.style.visibility = 'hidden';

                    // 同时隐藏所有子元素
                    const childElements = htmlElement.querySelectorAll('*');
                    childElements.forEach((child) => {
                        const childElement = child as HTMLElement;
                        childElement.style.display = 'none';
                        childElement.style.height = '0px';
                        childElement.style.width = '0px';
                        childElement.style.padding = '0px';
                        childElement.style.margin = '0px';
                        childElement.style.border = 'none';
                        childElement.style.background = 'transparent';
                        childElement.style.boxShadow = 'none';
                        childElement.style.opacity = '0';
                        childElement.style.visibility = 'hidden';
                    });

                    // 再过0.25秒后完全移除（等待动画完成）
                    setTimeout(() => {
                        if (element.parentNode) {
                            console.log('Removing error element:', element.textContent);
                            htmlElement.style.display = 'none';
                        }
                    }, 250);
                }, 1000);
            });
        };

        // 立即检查一次
        handleErrorMessages();

        // 使用MutationObserver监听DOM变化
        const observer = new MutationObserver(() => {
            // 延迟一点执行，确保DOM更新完成
            setTimeout(handleErrorMessages, 100);
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });

        // 也监听表单提交事件
        const handleFormSubmit = () => {
            setTimeout(handleErrorMessages, 200);
        };

        document.addEventListener('submit', handleFormSubmit);

        // 定期检查错误信息（作为备用方案）
        const intervalId = setInterval(handleErrorMessages, 500);

        return () => {
            observer.disconnect();
            document.removeEventListener('submit', handleFormSubmit);
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div style={styles.container}>
            {/* 全局样式 */}
            <style>
                {`
                    .ant-form-item {
                        margin-bottom: 0 !important;
                        height: 100% !important;
                        display: flex !important;
                        align-items: center !important;
                    }

                    .ant-form-item-control {
                        height: 100% !important;
                        display: flex !important;
                        align-items: center !important;
                        position: relative !important;
                    }

                    .ant-form-item-control-input {
                        height: 100% !important;
                        width:100% !important;
                        display: flex !important;
                        align-items: center !important;
                    }

                    .ant-form-item-explain {
                        position: absolute !important;
                        top: 100% !important;
                        left: 0 !important;
                        right: 0 !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        font-size: 12px !important;
                        line-height: 1 !important;
                        background: transparent !important;
                        border: none !important;
                        border-radius: 0 !important;
                        z-index: 1000 !important;
                        opacity: 1 !important;
                        transform: translateY(0) !important;
                        transition: opacity 0.25s ease-out, transform 0.25s ease-out, height 0.25s ease-out !important;
                        animation: errorFadeIn 0.25s ease-out !important;
                        height: auto !important;
                        min-height: 0 !important;
                        max-height: none !important;
                        box-shadow: none !important;
                    }

                    .ant-form-item-explain-error {
                        color: #ff4d4f !important;
                        padding: 4px 8px !important;
                        background: rgba(255, 255, 255, 0.95) !important;
                        border-radius: 4px !important;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
                        display: block !important;
                        margin: 4px 0 0 0 !important;
                    }

                    .ant-form-item-explain.error-hidden {
                        opacity: 0 !important;
                        transform: translateY(-10px) !important;
                        pointer-events: none !important;
                        height: 0 !important;
                        min-height: 0 !important;
                        max-height: 0 !important;
                        overflow: hidden !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        border: none !important;
                        background: transparent !important;
                        box-shadow: none !important;
                        line-height: 0 !important;
                        font-size: 0 !important;
                    }

                    .ant-form-item-explain.error-hidden .ant-form-item-explain-error {
                        display: none !important;
                        visibility: hidden !important;
                        height: 0 !important;
                        width: 0 !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        border: none !important;
                        background: transparent !important;
                        box-shadow: none !important;
                        line-height: 0 !important;
                        font-size: 0 !important;
                        opacity: 0 !important;
                    }

                    @keyframes errorFadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(-10px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes errorFadeOut {
                        from {
                            opacity: 1;
                            transform: translateY(0);
                        }
                        to {
                            opacity: 0;
                            transform: translateY(-10px);
                        }
                    }

                    .ant-input,
                    .ant-select-selector,
                    .ant-picker,
                    .ant-input-number,
                    .ant-radio-group,
                    .ant-checkbox-group {
                        width: 100% !important;
                        height: 32px !important;
                        line-height: 32px !important;
                        box-sizing: border-box !important;
                    }

                    .ant-select,
                    .ant-picker,
                    .ant-input-number {
                        width: 100% !important;
                    }

                    .ant-select .ant-select-selector {
                        width: 100% !important;
                    }
                    .ant-form-item-row{
                      width:100%;
                    }

                    /* 表格边框样式 - 使用更强的优先级 */
                    .table-container {
                        border: 2px solid #d9d9d9 !important;
                        border-radius: 6px !important;
                        overflow: hidden !important;
                        background-color: #fff !important;
                    }

                    .ant-row.table-row {
                        border-bottom: 2px solid #d9d9d9 !important;
                        margin: 0 !important;
                    }

                    .ant-row.table-row:last-child {
                        border-bottom: none !important;
                    }

                    .ant-col.table-cell {
                        border-right: 2px solid #d9d9d9 !important;
                        padding: 0 !important;
                    }

                    .ant-col.table-cell:last-child {
                        border-right: none !important;
                    }

                    /* 确保表格单元格内容正确显示 */
                    .table-cell-content {
                        border-right: 2px solid #d9d9d9 !important;
                        height: 100% !important;
                        display: flex !important;
                    }

                    .table-cell-content:last-child {
                        border-right: none !important;
                    }
                `}
            </style>

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
                            ...styles.sectionContentWrapper,
                            // maxHeight: isCollapsed ? '0px' : '2000px',
                            overflow: 'hidden',
                            transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                            opacity: isCollapsed ? 0 : 1,
                            transform: isCollapsed ? 'translateY(-10px)' : 'translateY(0)',
                        }}>
                            <div style={styles.sectionContent}>
                                <div style={styles.tableContainer} className="table-container">
                                    {section.list?.map((rowData: any, rowIndex: number) => {
                                        // 适配新的数据格式：{height: 100, rows: [field1, field2]}
                                        console.log('rowData:', rowData);
                                        const row = rowData.rows || rowData; // 兼容旧格式
                                        const rowHeight = rowData.height || 48; // 使用指定高度或默认48px
                                        const columnCount = row.length;
                                        const isLastRow = rowIndex === section.list.length - 1;
                                        console.log('row:', row, 'rowHeight:', rowHeight, 'columnCount:', columnCount);

                                        return (
                                            <Row key={rowIndex}
                                                 className="table-row"
                                                 style={{
                                                     ...styles.tableRow,
                                                     minHeight: `${rowHeight}px`,
                                                     height: `${rowHeight}px`,
                                                     borderBottom: isLastRow ? 'none' : '2px solid #d9d9d9'
                                                 }}
                                                 gutter={0}>
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
                                                                <div key={fieldIndex} style={{ display: 'none' }}>
                                                                    <AntForm.Item
                                                                        name={field.fieldName}
                                                                        hidden={true}
                                                                    >
                                                                        {newChildren}
                                                                    </AntForm.Item>
                                                                </div>
                                                            )
                                                        }

                                                        // 计算Col的span，根据列数平均分配
                                                        const colSpan = 24 / columnCount;
                                                        const isLastColumn = fieldIndex === row.length - 1;

                                                        return (
                                                            <Col key={fieldIndex}
                                                                 span={colSpan}
                                                                 className="table-cell"
                                                                 style={{
                                                                     padding: 0,
                                                                     minHeight: `${rowHeight}px`,
                                                                     height: `${rowHeight}px`
                                                                 }}>
                                                                <div
                                                                    className="table-cell-content"
                                                                    style={{
                                                                        ...styles.tableCell,
                                                                        minHeight: `${rowHeight}px`,
                                                                        height: `${rowHeight}px`,
                                                                        borderRight: isLastColumn ? 'none' : '2px solid #d9d9d9'
                                                                    }}>
                                                                    <div style={{
                                                                        ...styles.tableCellLabel,
                                                                        minHeight: `${rowHeight}px`,
                                                                        height: `${rowHeight}px`
                                                                    }}>
                                                                        {formField.props.required && (
                                                                            <span style={styles.requiredStar}>*</span>
                                                                        )}
                                                                        {label}
                                                                    </div>
                                                                    <div style={{
                                                                        ...styles.tableCellValue,
                                                                        minHeight: `${rowHeight}px`,
                                                                        height: `${rowHeight}px`
                                                                    }}>
                                                                        <FormItemRender
                                                                            field={formField}
                                                                            children={newChildren}
                                                                        />
                                                                    </div>
                                                                </div>
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
        // minHeight: '100vh',
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
    sectionContentWrapper: {
        backgroundColor: '#fff',
        willChange: 'max-height, opacity, transform',
    },
    sectionContent: {
        padding: '20px',
        backgroundColor: '#fff',
    },
    tableContainer: {
        width: '100%',
        border: '2px solid #d9d9d9',
        borderCollapse: 'collapse' as const,
        borderRadius: '6px',
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    tableRow: {
        display: 'flex',
        width: '100%',
        borderBottom: '2px solid #d9d9d9',
    },
    tableCell: {
        borderRight: '2px solid #d9d9d9',
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
        borderRight: '2px solid #d9d9d9',
        minHeight: '48px',
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
        minHeight: '48px',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box' as const,
    },
    formItemContainer: {
        position: 'relative' as const,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    inputContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        minHeight: '32px',
    },
    formItemWrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    requiredStar: {
        color: '#ff4d4f',
        marginRight: '4px',
    },
} as const;

export default FormDisplayRender;


