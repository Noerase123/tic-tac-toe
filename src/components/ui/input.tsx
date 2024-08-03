import * as React from "react"
import { useController } from "react-hook-form";

import { cn } from "../../lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    control: any;
    name: string;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, control, name, label, ...props }, ref) => {
    const {
      field: { onChange, value, onBlur },
      fieldState: { error }
    } = useController({ control, name });
    return (
      <div className="my-2">
        <label>{label}</label>
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          {...props}
        />
        {error && Boolean(error.message) && (
          <p className="text-red-400">{error.message}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
