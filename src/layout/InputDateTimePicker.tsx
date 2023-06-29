import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

interface Props {
  onChange: any;
  value: any;
  nameDate: string;
  label: string;
  classDiv?: string;
  classLabel?: string;
  classDatePicker?: string;
}

const InputDateTimePicker: React.FC<Props> = ({
  onChange,
  value,
  nameDate,
  label,
  classDiv,
  classLabel,
  classDatePicker,
}) => {
  const [focus, setFocus] = useState(false);
  console.log(focus);
  return (
    <div className={`flex ${classDiv} items-center `}>
      <label htmlFor="" className={`${classLabel} text-[8pt] font-bold`}>
        {label}
      </label>
      <DatePicker
        onChange={(date) => {
          onChange(nameDate, date);
        }}
        value={value}
        format="dd/MM/yy"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`${classDatePicker} ${
          focus === true
            ? "border-[#80bdff] shadow-[0_0_0_0.2rem_rgba(0,123,255,.25)]"
            : "border-[#ced4da]"
        } text-[12px] border h-full rounded-[0.25rem] outline-none transition-all`}
      />
    </div>
  );
};

export default InputDateTimePicker;
