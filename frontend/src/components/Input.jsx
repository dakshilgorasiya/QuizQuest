import React, { useId } from "react";

export default function Input({
    label = "",
    type = "text",
    className = "",
    placeHolder = "",
    value,
    onChange,
    ...props
}) {
    const id = useId();
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-base font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`rounded-lg px-2 py-1 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${className}`}
                {...props}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeHolder}
            />
        </div>
    );
}
