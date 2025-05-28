import React, { useState, forwardRef, useEffect } from "react"
import { Check } from "lucide-react"
import { cn } from "../../lib/utils"

const Checkbox = forwardRef(
  (
    {
      className,
      defaultChecked = false,
      onCheckedChange,   
      ...props
    },
    ref
  ) => {
    const [checked, setChecked] = useState(defaultChecked)

    useEffect(() => {
      setChecked(defaultChecked)
    }, [defaultChecked])

    const handleChange = (e) => {
      const next = e.currentTarget.checked
      setChecked(next)
      if (onCheckedChange) onCheckedChange(next)
    }

    return (
      <div className="relative">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={handleChange}
          className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm border border-primary " +
              "ring-offset-background focus-visible:outline-none focus-visible:ring-2 " +
              "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed " +
              "disabled:opacity-50",
            className
          )}
          {...props}
        />
        <Check className="absolute top-0 left-0 h-4 w-4 text-current opacity-0 peer-checked:opacity-100 pointer-events-none" />
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"

export { Checkbox }
