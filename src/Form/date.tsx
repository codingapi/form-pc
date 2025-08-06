import React from "react";
import {FormInstance, FormTypeProps} from "@codingapi/ui-framework";
import {DatePicker, Space} from "antd";
import dayjs from "dayjs";
import "./index.scss";
import {FormContext} from "./context";

const datePrecisionConverter = (precision?: string) => {
    if (precision === "day") {
        return "date";
    }
    if (precision === "year") {
        return "year";
    }
    if (precision === "month") {
        return "month";
    }
    if (precision === "week") {
        return "week";
    }
    if (precision === "quarter") {
        return "quarter";
    }
    if (precision === "week-day") {
        return "week";
    }

    if (precision === "hour") {
        return "date";
    }

    if (precision === "minute") {
        return "date";
    }

    if (precision === "second") {
        return "date";
    }

    return null;
}

const showTime = (precision?: string) => {
    if (precision === "hour") {
        return {
            format: 'HH'
        }
    }

    if (precision === "minute") {
        return {
            format: 'HH:mm'
        }
    }

    if (precision === "second") {
        return {
            format: 'HH:mm:ss'
        }
    }

    return null;
}

interface $DatePicker extends FormTypeProps{
    formInstance?:FormInstance;
}

const $DatePicker:React.FC<$DatePicker> = (props)=>{

    const formInstance = props.formInstance;

    const format = props.dateFormat || 'YYYY-MM-DD';
    const precision = datePrecisionConverter(props.datePrecision) || "date";
    const showTimeConfig = showTime(props.datePrecision);
    const value = props.value?dayjs(props.value):undefined;

    return (
      <Space.Compact
          style={{
              width:"100%"
          }}
      >
          {props.addonBefore}
          <DatePicker
              style={{
                  width:"100%"
              }}
              disabled={props.disabled}
              value={value}
              prefix={props.prefix}
              suffixIcon={props.suffix}
              placeholder={props.placeholder}
              picker={precision}
              showTime={showTimeConfig?{format: showTimeConfig.format}:false}
              onChange={(date, dateString) => {
                  const currentDate = dayjs(date).format(format);
                  props.onChange && props.onChange(currentDate, formInstance);
              }}
              {...props.itemProps}
          />
          {props.addonAfter}
      </Space.Compact>
    )
}

export const FormDate: React.FC<FormTypeProps> = (props) => {

    const formContext = React.useContext(FormContext) || undefined;

    return (
        <$DatePicker
            {...props}
            formInstance={formContext}
        />
    )
}

