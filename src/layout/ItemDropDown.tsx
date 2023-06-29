import React, { useState } from "react";

interface Props {
  label: string;
  value: any;
  dataTitle?: any;
  handleSetValue: any;
  dataDropDown: any;
  nameValue: string;
  classParent: string;
  classParentDropDown: string;
  classLabel?: string;
  required?: boolean;
}

const ItemDropDown: React.FC<Props> = ({
  label,
  value,
  dataTitle,
  handleSetValue,
  dataDropDown,
  nameValue,
  classParent,
  classLabel,
  classParentDropDown,
  required,
}) => {
  const [focus, setFocus] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  return (
    <div className={`${classParent}`}>
      <label htmlFor="money" className={`${classLabel} text-[9pt]`}>
        {label}
      </label>
      <div className="flex items-center gap-[6px] h-7">
        <div>
          <div
            className={`${classParentDropDown}  relative flex items-center border border-[#ced4da] h-full rounded-[4px] transition-all ${
              focus
                ? "border-blue-300 shadow-[0px_0px_0px_4px_rgba(200,237,255,0.5)]"
                : ""
            }`}
          >
            <input
              type="text"
              className="rounded-[4px] text-[12px] h-[27px] !border-none w-full pr-[30px] outline-none cursor-pointer"
              onClick={() => {
                setIsTrue(!isTrue);
              }}
              readOnly
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={() => {
                setIsTrue(false);
                setFocus(false);
              }}
              value={value}
            />
            <span className="absolute right-2">
              <svg
                width="9"
                height="5"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 7.44697L0 1.6132L1.4 0.251984L6 4.72455L10.6 0.251984L12 1.6132L6 7.44697Z"
                  fill="#192132"
                />
              </svg>
            </span>
          </div>

          {isTrue === true && isTrue === true && (
            <div
              className={`absolute z-40 flex flex-col ${classParentDropDown} bg-white border shadow-xl py-[2px] rounded-lg overflow-hidden`}
            >
              <span className="py-[4px] px-3 cursor-default">{dataTitle}</span>
              {dataDropDown?.map((item: any, index: number) => (
                <span
                  className="hover:bg-[#1E90FF] py-[4px] px-3 text-[12px] hover:text-white cursor-pointer"
                  onMouseDown={() => {
                    handleSetValue(nameValue, item);
                  }}
                  key={index}
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
        <div
          className={`${
            required === true
              ? "flex items-center w-1 whitespace-nowrap translate-y-[5px]"
              : "hidden"
          } `}
        >
          <p className="flex items-center text-[21px] font-bold text-[#ff0000]">
            *
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemDropDown;
