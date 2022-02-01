import classNames from "classnames";
import React from "react";
import FieldError from "./FieldError";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
const TextInput: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {
    className,
    label,
    onChange,
    value,
    type = "text",
    name,
    autoComplete,
    error,
    placeholder,
    required,
    min,
    disabled,
    step,
  },
  ref
) => {
  return (
    <div className="w-full my-2 group">
      <label htmlFor={name} className="text-sm text-gray-600">
        {label}
        {required && <span className="text-secondary-light">*</span>}
      </label>
      <input
        type={type}
        name={name}
        className={classNames(
          "w-full focus:outline-none px-4 border border-gray-100 py-1.5 hover:ring-1 focus:ring-1 ring-green-400 rounded-md shadow-sm"
        )}
        onChange={onChange}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        min={min}
        ref={ref}
        disabled={disabled}
        step={step}
      />
      <FieldError error={error} />
    </div>
  );
};

export default React.forwardRef(TextInput);
