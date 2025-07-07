import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    radius?: "xs" | "md" | "xl" | "full";
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, className, radius = "xl", ...props }, ref) => {
        Select.displayName = "select";

        const radiuses = {
            xs: "rounded-xs",
            md: "rounded-md",
            xl: "rounded-xl",
            full: "rounded-full",
        };

        const style = `transition-all duration-600 w-auto px-4 py-2 border ${radiuses[radius]}`;

        return (
            <div className="flex place-items-center gap-2">
                <select
                    ref={ref}
                    className={`${style} ${
                        error
                            ? "border-red-500 shadow-xs shadow-red-600"
                            : "border-gray-300"
                    } ${className}`}
                    {...props}
                >
                    <option>{label}</option>
                </select>
                {error && (
                    <p className="transition-all duration-600 mt-1 ml-2 text-sm text-red-500">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

export default Select;
