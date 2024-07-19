import React, { useId } from "react";

function Select({ options, label, className = "", value, onChange, ...props }) {
    const id = useId();
    return (
        <div className="flex flex-col">
            {label && (
                <label htmlFor={id} className="text-sm">
                    {label}
                </label>
            )}
            <select
                {...props}
                id={id}
                className={`border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
                value={value}
                onChange={onChange}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
