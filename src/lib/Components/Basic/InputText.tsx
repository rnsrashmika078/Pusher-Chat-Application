import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    radius?: "xs" | "md" | "xl" | "full";
}

const InputText = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, radius = "xl", ...props }, ref) => {
        InputText.displayName = "Input";

        const radiuses = {
            xs: "rounded-xs",
            md: "rounded-md",
            xl: "rounded-xl",
            full: "rounded-full",
        };

        const style = `text-[var(--foreground)] placeholder:text-[var(--placeholder)] shadow-sm transition-all duration-600 w-auto px-4 py-1  ${radiuses[radius]}`;

        return (
            <div className="mb-1 mt-3">
                {label && (
                    <label className="block text-sm  text-gray-400 mb-1">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    type="text"
                    className={`border border-gray-700/40 ${style} ${
                        error
                            ? "border-red-500 shadow-xs shadow-red-600"
                            : "border-gray-300"
                    } ${className}`}
                    {...props}
                />
                {error && (
                    <span className="transition-all duration-600 mt-1 ml-2 text-sm text-red-500">
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

export default InputText;
